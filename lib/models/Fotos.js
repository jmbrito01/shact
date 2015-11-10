TIPO_PRIVADO = 0;
TIPO_PUBLICO = 1;
STATUS_IDLE = 0;
STATUS_RECONHECENDO = 1;
STATUS_RECONHECIDO = 2;
STATUS_ERRO = 3;

METODO_FOTO = 0;
METODO_GEO =  1;
METODO_AMIZADE = 2;
METODO_TELEFONE = 3;
METODO_FOTOGRAFO = 4

FOTO_RAIO_PROXIMIDADE = 100000;

Fotos = new Mongo.Collection('Fotos');

Schemas.Tags = new SimpleSchema({
  userId: {
    type:String
  },
  porId: {
    type:String
  },
  metodo:{
    type: String,
    allowedValues:['reconhecimento','contato','telefone']
  }
});

Schemas.Participantes = new SimpleSchema({
  userId:{
    type: String
  },
  porId:{
    type: String
  },
  metodo:{
    type: String,
    allowedValues: [METODO_FOTO,METODO_GEO,METODO_AMIZADE,METODO_TELEFONE]
  }
});

Schemas.UsersProximos = new SimpleSchema({
  userId:{
    type:String
  },
  distancia:{
    type: Number,
    decimal:true
  }
});

Fotos.Schema = new SimpleSchema({
    imagem: {   //guarda publicId e URL
      type: Schemas.Imagem
    },
    userId:{    //quem tirou a foto
      type:String
    },
    localizacao:{   //Coordenadas onde a foto foi tirada
      type: Schemas.Coordenadas,
      optional: true
    },
    participantes:{
      type: [Schemas.Participantes],
      optional:true,
      blackbox:true
    },
    tipo:{
      type: Number,
      allowedValues:[TIPO_PRIVADO,TIPO_PUBLICO]
    },
    usersProximos:{
      type: [Schemas.UsersProximos],
      optional:true,
      blackbox:true
    },
    reconhecimento:{
      type: Object,
      optional: true,
      blackbox: true,
      defaultValue: {}
    },
    'reconhecimento.status':{
      type: Number
    }
});
Fotos.attachSchema(Fotos.Schema);
Fotos.attachBehaviour('timestampable');

Fotos.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};


if (Meteor.isServer) {
  Fotos.allow({
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


Fotos.helpers({
  link:function(){
    return FlowRouter.path('compartilhaveis.view',{id:this._id});
  },  
  tags:function(){
    return Tags.find({fotoId: this._id});
  },
  fotografo: function(){
    return Meteor.users.findOne({_id: this.userId});
  }
})


if (Meteor.isServer){
    Fotos.after.remove(function(userId,doc){
      //
      // Quando remover foto, remover todas as tags. Quando tag é removida, descadastro do SkyBiometry
      //
      var trans = this.transform();
      var tags = trans.tags().fetch();

      _.each(tags, function(tag){
        Tags.remove({_id: tag._id});
      })
    })
}

