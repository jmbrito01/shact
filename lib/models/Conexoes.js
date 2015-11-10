
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
    type:String,
    optional:true
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
  },
  meusPerfis:function(){
    var perfis = this.perfis
    return Perfis.find({_id: {$in: perfis}, userId: Meteor.userId()});
  },
  perfisRecebidos:function(){
    var perfis = this.perfis;
    return Perfis.find({_id: {$in: perfis}, userId: {$ne: Meteor.userId()}});
  }
});


if (Meteor.isServer){
    Conexoes.after.update(function(userId,doc, fieldNames, modifier, options){
      console.log(doc);
        if (modifier.$set && modifier.$set.status==CONEXAO_ACEITA){
          var userA = doc.userIds[0];
          var userB = doc.userIds[1];
          Meteor.users.update({_id: userA}, {$addToSet:{contatos: userB}, $pull:{recentes: userB}});  //quem adicionou
          Meteor.users.update({_id: userB}, {$addToSet:{contatos: userA}, $pull:{pendentes: userA}});  //quem foi adicionado
        }
    });    

    Conexoes.after.insert(function(userId,doc){
      var userA = doc.userIds[0];
      var userB = doc.userIds[1];

      Meteor.users.update({_id: userA}, {$addToSet:{recentes: userB}});
      Meteor.users.update({_id: userB}, {$addToSet:{pendentes: userA}});
    })

    Conexoes.after.remove(function(userId, doc){
      var userA = doc.userIds[0]; //quem adicionou
      var userB = doc.userIds[1]; //quem foi adicioonado

      switch (doc.status){
        case  CONEXAO_ACEITA:
          Meteor.users.update({_id: userA}, {$pull:{contatos: userB}});  //quem adicionou
          Meteor.users.update({_id: userB}, {$pull:{contatos: userA}});  //quem foi adicionado
        break;  
        case CONEXAO_PENDENTE:
          Meteor.users.update({_id: userA}, {$pull:{recentes: userB}});  //quem adicionou
          Meteor.users.update({_id: userB}, {$pull:{pendentes: userA}});  //quem foi adicionado
        break;
      }
    });
}