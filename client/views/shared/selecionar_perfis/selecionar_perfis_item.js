//perfisSelecionados = new ReactiveDict('PerfisSelecionados');

perfisSelecionados = new ReactiveVar([]);

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

        //perfisSelecionados.set(perfilId, !perfisSelecionados.get(perfilId));

        var p = perfisSelecionados.get();
        console.log(p);
        if (_.contains(p, perfilId)){
            p.remove(perfilId);
        }else{
            p.push(perfilId);
        }

        console.log(p);
        
        perfisSelecionados.set(p);
    }
})

Template.selecionarPerfilItem.helpers({
    semCor:function(){
        var perfilId = Template.instance().data._id;
        //return !perfisSelecionados.equals(perfilId,true);
        var p = perfisSelecionados.get();
        return !(_.contains(p,perfilId));
    }
})

