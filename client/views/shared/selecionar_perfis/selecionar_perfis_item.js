perfisSelecionados = new ReactiveDict('PerfisSelecionados');

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

        perfisSelecionados.set(perfilId, !perfisSelecionados.get(perfilId));
    }
})

Template.selecionarPerfilItem.helpers({
    semCor:function(){
        var perfilId = Template.instance().data._id;
        return !perfisSelecionados.equals(perfilId,true);
    }
})

