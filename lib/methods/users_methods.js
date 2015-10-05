Meteor.methods({
   setLocalizacao:function(localizacao){
      var userId = Meteor.userId();
      Meteor.users.update(userId,{$set:{localizacao : localizacao}});
      if (Meteor.isServer){
      	elasticSearch.setLocalizacao(userId,localizacao);
      }
   },	
})