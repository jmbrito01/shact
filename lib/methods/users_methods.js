Meteor.methods({
   setLocalizacao:function(localizacao){
    check(localizacao, Object);
      var userId = Meteor.userId();
      Meteor.users.update(userId,{$set:{localizacao : localizacao}});

      //atualizo no elastic search
      if (Meteor.isServer){
        elasticSearch.setLocalizacao(userId,localizacao);
      }
   },	
   setAvatar:function(id){
      check(id, String);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.avatar':id}});
   }
})