Template.compartilhaveis.helpers({
	compartilhaveis: function(){
		return Compartilhaveis.find();
	}
})

Template.compartilhaveis.events({
	'click .compartilhaveis-acoes':function(){
        var perfil = this.meuPerfil();
        console.log(perfil);

        IonActionSheet.show({
          titleText: 'Compartilhável',
          buttons: [
            { text: 'Visitar perfil' },
          ],

          destructiveText: '<i class="icon ion-trash-outline"></i> Deletar',
          cancelText: 'Cancel',
          cancel: function() {
            console.log('Cancelled!');
          },
          destructiveButtonClicked: function() {
          	console.log(self._id);
          	Perfis.remove({_id:perfil._id});
            return true;
          },
          buttonClicked: function(index) {
          	console.log("visitar perfil!");
            return true;
          },          
        });		
	},
	'click .adicionar-perfil':function(){
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
			texto = 'Sincronizar ' + this.nome;
			acao = function(){
				loginCom(self.service,function(){
					console.log("success");
				});				
			}
		}else{
			texto = 'Cadastrar um perfil';
			acao = function(){


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


        IonActionSheet.show({
          titleText: 'Compartilhável',
          buttons: [
            { text: texto },
          ],
          cancelText: 'Cancel',
          cancel: function() {
            console.log('Cancelled!');
          },
          buttonClicked: function(index) {
          	if (index===0){
          		console.log("acao!");
          		acao();
          	}
            return true;
          },          
        });		

	},
	'click .remover-perfil':function(){
		var self = this;

		alertify.confirm('Tem certeza?',function(){
			Perfis.remove({_id:self._id});
		});	
	}
})