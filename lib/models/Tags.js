TIPO_PRIVADO = 0;
TIPO_PUBLICO = 1;

Tags = new Mongo.Collection('Tags');

Schemas.Candidatos = new SimpleSchema({
  userId: {
    type: String
  },
  certeza: {
    type: Number,
    decimal:true
  }
});

Schemas.Dimensoes = new SimpleSchema({
  width:{
    type:Number,
    decimal:true
  },
  height:{
    type:Number,
    decimal:true
  }
});

Schemas.Posicao = new SimpleSchema({
  x:{
    type:Number,
    decimal:true
  },
  y:{
    type: Number,
    decimal:true
  }
});

Tags.Schema = new SimpleSchema({
    userId: {
      type: String,
      optional:true
    },
    porId:{
      type: String,
      optional:true
    },
    tagId: {
        type: String,
        optional:true
    },
    tempTagId:{
        type: String,
        optional:true
    },
    fotoId:{
        type:String
    },    
    tipo:{
      type: Number,
      allowedValues:[TIPO_PRIVADO,TIPO_PUBLICO]
    },        
    dimensoes:{
      type: Schemas.Dimensoes,
      blackbox:true,
      optional:true
    },
    posicao:{
      type: Schemas.Posicao,
      blackbox:true,
      optional:true
    },

    candidatos:{
      type: [Schemas.Candidatos],
      optional:true
    },
});


Tags.attachSchema(Tags.Schema);
Tags.attachBehaviour('timestampable');

Tags.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Tags.allow({
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




Tags.helpers({
  link:function(){
    return FlowRouter.path('cargos.view',{id:this._id});
  },
  user:function(){
    return (this.userId) ? Meteor.users.findOne({_id: this.userId}) : false;
  }
});



if (Meteor.isServer){
  Tags.after.remove(function(userId,doc){
    if (doc.userId && doc.tagId){
      try{
        shactRecognition.removerTagSync(doc.tagId);
        console.log("tag removida!");
        shactRecognition.treinarUserSync(doc.userId);
        console.log("usuario treinado!");
      }catch(e){
        throw new Meteor.Error(e.toString());
      }
    }
  });
}