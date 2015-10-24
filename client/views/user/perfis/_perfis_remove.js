Template.perfisRemove.events({
	'click #remover-perfil':function(){
		var self = this;
	    IonPopup.confirm({
	      title: 'Remover perfil',
	      template: 'Tem certeza? todos suas conexões perderão este contato',
	      onOk: function() {
	    	Perfis.remove({_id:self._id});    
	      },
	    });
	}
})