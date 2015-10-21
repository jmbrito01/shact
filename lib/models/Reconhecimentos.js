Reconhecimentos = new Mongo.Collection('Reconhecimentos');

Reconhecimentos.Schema = new SimpleSchema({
    userId: {
      type: String
    },
    compartilhavelId: {
      type: String
    },
    valor: {
      type: String
    }
});
Reconhecimentos.attachSchema(Reconhecimentos.Schema);
Reconhecimentos.attachBehaviour('timestampable');

Reconhecimentos.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Reconhecimentos.allow({
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


Reconhecimentos.helpers({
  link:function(){
    return FlowRouter.path('cargos.view',{id:this._id});
  },  
  dataValidade: function(){
    if (this.validade instanceof Date){
      return moment(this.validade).format("DD/MM/YYYY");
    }
  }
});
