Meteor.methods({
   setLocalizacao:function(localizacao){
      var userId = Meteor.userId();
      Meteor.users.update(userId,{$set:{localizacao : localizacao}});
      if (Meteor.isServer){
      	elasticSearch.setLocalizacao(userId,localizacao);
      }
   },	
   cadastrarFoto:function(publicId, url){
   	check (publicId, String);
   	check (url, String);

   	var imagemDoc = {
   		publicId: publicId,
   		url:url
   	}
      var localizacao = Meteor.user().localizacao || {};

      var fotoDoc = {
         imagem:imagemDoc,
         userId: Meteor.userId()
      }

      if (localizacao){
         _.extend(fotoDoc,{
            localizacao:localizacao
         });
      }

      var fotoId = Fotos.insert(fotoDoc);

   	Meteor.users.update({_id: Meteor.userId()}, {$push: {'profile.fotos': fotoId}});
   },
   removerFoto:function(id){
         check(id, String);
         Fotos.remove({_id: id});
         Meteor.users.update({_id: Meteor.userId()}, {$pull:{'profile.fotos':id}});         

         console.log(id);
         console.log(Meteor.user().profile.avatar);

         if (Meteor.user().profile.avatar==id){
            var novoAvatar = _.last(Meteor.user().profile.fotos);
            Meteor.call('setAvatar',novoAvatar);
         }
   },
   setAvatar:function(id){
      check(id, String);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.avatar':id}});
   }
})