

perfisSelecionados = new ReactiveVar([]);
ultimaAcao = new ReactiveVar({});

Array.prototype.remove = function(value) {
    if (this.indexOf(value)!==-1) {
       this.splice(this.indexOf(value), 1);
       return true;
   } else {
      return false;
   };
} 

ReactiveDict.prototype.valoresVerdadeiros = function(){
    var perfis = [];
    var keys = this.keys;
    var self = this;

    Object.keys(keys).forEach(function(key){
      if (self.get(key)){
        perfis.push(key);
      }
    }); 

    return perfis;
}

Template.selecionarPerfilItem.events({
    'click .selecionar-perfil':function(e,tmpl){
        var perfilId = tmpl.data._id;

        var p = perfisSelecionados.get();
        if (_.contains(p, perfilId)){
            p.remove(perfilId);
            ultimaAcao.set({
              _id: perfilId,
              action: 'remove'
            })
        }else{
            p.push(perfilId);
            ultimaAcao.set({
              _id: perfilId,
              action: 'push'
            })            
        }
        
        perfisSelecionados.set(p);
    }
})

Template.selecionarPerfilItem.helpers({
    semCor:function(){
        var perfilId = Template.instance().data._id;
        var p = perfisSelecionados.get();
        return !(_.contains(p,perfilId));
    }
})

