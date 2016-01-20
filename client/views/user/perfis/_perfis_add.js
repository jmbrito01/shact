Template.perfisAdd.events({
	'click #adicionar-perfil':function(){
		if (Meteor.user().services[this.service]){
			var field = 'services.' + this.service;
			var unset = {};
			unset[field] = '';

			Meteor.users.update(
				{_id:Meteor.userId()},
				{$unset: unset}
			);
		}


		var texto;
		var acao;
		var self = this;

		if (this.metodo=='oauth'){
			loginCom(self.service,function(){
				console.log (' oauth callback');
				$(".content").height('100%');
			});				
		}else{
		    IonPopup.prompt({
				title: 'Cadastrar novo perfil',
				template: 'Insira um valor',
				okText: 'Cadastrar',
				inputType: 'text',
				inputPlaceholder: self.mascara,
				onOk: function(event,response) {
					console.log(response);
					Perfis.insert({userId:Meteor.userId(),compartilhavelId:self._id, valor:response});
					IonPopup.close();
				}
		    });		
		}		
	}
})	
	