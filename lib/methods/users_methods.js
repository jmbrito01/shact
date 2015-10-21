Meteor.methods({
   setLocalizacao:function(localizacao){
      var userId = Meteor.userId();
      Meteor.users.update(userId,{$set:{localizacao : localizacao}});
      if (Meteor.isServer){
      	elasticSearch.setLocalizacao(userId,localizacao);
      }
   },	
   cadastrarFoto:function(publicId, url, tipo){
      this.unblock();
   	check (publicId, String);
   	check (url, String);

   	var imagemDoc = {
   		publicId: publicId,
   		url:url
   	}
      

      var fotoDoc = {
         imagem:imagemDoc,
         userId: Meteor.userId(),
         tipo: tipo,
         reconhecimento:{
            status: STATUS_RECONHECENDO
         }
      }

      var localizacao = Meteor.user().localizacao || {};
      if (tipo==TIPO_PUBLICO && localizacao && Meteor.isServer){
         var es = elasticSearch.usuariosProximos(localizacao, FOTO_RAIO_PROXIMIDADE, [], '');  
         
         var usersProximos = _.map(es.resultados,function(resultado){
            return {
               userId: resultado._id,
               distancia: resultado.distance
            }
         });

         _.extend(fotoDoc,{
            usersProximos: usersProximos,
            localizacao:localizacao
         })            
      }

      return Fotos.insert(fotoDoc);
   },
   removerFoto:function(id){
         check(id, String);

         Fotos.remove({_id: id});

         var proxFoto = Fotos.findOne({userId: Meteor.userId()});

         if (Meteor.user().profile.avatar==id){
            var novoAvatar = (proxFoto) ?  proxFoto._id : "";
            Meteor.call('setAvatar',novoAvatar);
         }
   },
   setAvatar:function(id){
      check(id, String);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.avatar':id}});
   }
})