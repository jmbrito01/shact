
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
})

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
    tags:{
      type: [Schemas.Tags],
      optional:true
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
})