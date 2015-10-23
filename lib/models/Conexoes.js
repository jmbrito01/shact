
METODO_FOTO = 1;
METODO_GEO = 2;
METODO_TEL = 3;

CONEXAO_PENDENTE = 0;
CONEXAO_ACEITA = 1;
CONEXAO_REJEITADA = 2;

Conexoes = new Mongo.Collection('Conexoes');

Schemas.MetodoConexao = new SimpleSchema({
  tipo:{
    type:Number,
    allowedValues:[METODO_FOTO,METODO_GEO,METODO_TEL]
  },
  localizacao:{
    type: Schemas.Coordenadas,
    optional:true
  },
  tagId:{
    type: String,
    optional:true
  },
  fotoId: {
    type: String,
    optional:true
  }
});

Conexoes.Schema = new SimpleSchema({
  userIds: {
    type:[String]
  },
  perfis:{
    type:[String]
  },
  metodo:{
    type: Schemas.MetodoConexao,
  },
  status:{
    type: Number,
    allowedValues:[CONEXAO_PENDENTE,CONEXAO_ACEITA,CONEXAO_REJEITADA]
  },
  mensagem:{
    type:String
  }
});

Conexoes.attachSchema(Conexoes.Schema);
Conexoes.attachBehaviour('timestampable');

Conexoes.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};


if (Meteor.isServer) {
  Conexoes.allow({
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


Conexoes.helpers({
  link:function(){
    return FlowRouter.path('compartilhaveis.view',{id:this._id});
  },
  userAdicionando:function(){
    return Meteor.users.findOne({_id: this.userIds[0]});
  },
  userAdicionado:function(){
    return Meteor.users.findOne({_id: this.userIds[1]});
  },
  outroUsuario:function(){
    var userIds = this.userIds;
    var outroUsuario = _.difference(userIds,Meteor.userId())[0];
    console.log("user ids", userIds);
    console.log("outro usuario", outroUsuario);

    return Meteor.users.findOne({_id: outroUsuario});
  }
});

