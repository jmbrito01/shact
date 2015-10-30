
Template.conexoesAdd.helpers({
	user:function(){
		return Meteor.users.findOne({_id: Template.instance().userId});
	}
})

Template.conexoesAdd.onCreated(function(){
	this.userId = this.data.id;
})
Template.conexoesAdd.events({
	'click #conectar':function(e, tmpl){
		var contatoId = tmpl.userId;
		var perfis = perfisSelecionados.get();

		var localizacao = Meteor.user().localizacao || {};
		var mensagem = tmpl.$('#mensagem').val();

		Conexoes.insert({
			userIds: [Meteor.userId(), contatoId],
			perfis: perfis,
			metodo:{
				tipo: METODO_GEO,
				localizacao: localizacao
			},
			status: CONEXAO_PENDENTE,
			mensagem:mensagem
		})


		IonModal.close();

	}
})