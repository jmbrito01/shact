/*
Contatos = new Mongo.Collection('Contatos');

Contatos.Schema = new SimpleSchema({
  userId: {
    type:String
  },
  foto:{
    type: Schemas.Imagem
  }
});
Contatos.attachSchema(Contatos.Schema);
Contatos.attachBehaviour('timestampable');

Contatos.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};


if (Meteor.isServer) {
  Contatos.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}


Contatos.helpers({
  link:function(){
    return FlowRouter.path('compartilhaveis.view',{id:this._id});
  },  
  meuPerfil:function(){
    return Perfis.findOne({compartilhavelId:this._id, userId: Meteor.userId()});
  }
});

*/