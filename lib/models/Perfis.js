Perfis = new Mongo.Collection('Perfis');

Perfis.Schema = new SimpleSchema({
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
Perfis.attachSchema(Perfis.Schema);
Perfis.attachBehaviour('timestampable');

Perfis.quickList = function() {
    return this.find().map(function (c) {
        return {label: c.nome, value: c._id};
    });
};

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Perfis.allow({
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


Perfis.helpers({
  link:function(){
    return FlowRouter.path('cargos.view',{id:this._id});
  },  
  compartilhavel:function(){
    return Compartilhaveis.findOne({_id: this.compartilhavelId});
  }
});
