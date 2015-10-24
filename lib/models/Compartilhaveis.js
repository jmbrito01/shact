CATEGORIA_SOCIAL = 0;
CATEGORIA_PROFISSIONAL = 1;

Compartilhaveis = new Mongo.Collection('Compartilhaveis');

Compartilhaveis.Schema = new SimpleSchema({
    nome: {
      type: String
    },
    cor:{
      type: String
    },
    icone:{
      type: String
    },
    tipo:{
      type: String
    },
    categoria:{
      type: String
    },
    metodo:{
      type: String,
      allowedValues:['manual','oauth']
    },
    service:{
      type: String,
      optional:true
    },
    mascara:{
      type:String,
      optional:true
    },
    campoPerfil:{
      type:String,
      optional:true
    }
});
Compartilhaveis.attachSchema(Compartilhaveis.Schema);
Compartilhaveis.attachBehaviour('timestampable');

Compartilhaveis.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};


if (Meteor.isServer) {
  Compartilhaveis.allow({
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


Compartilhaveis.helpers({
  link:function(){
    return FlowRouter.path('compartilhaveis.view',{id:this._id});
  },  
  meuPerfil:function(){
    return Perfis.findOne({compartilhavelId:this._id, userId: Meteor.userId()});
  }
});
