Template.notificacoes.helpers({
	template: function(){
		return Session.get('notificacoesTab');
	}
})
Template.notificacoes.events({
	'click .mudar-tab': function(e){
		Session.set('notificacoesTab', $(e.target).data('tab'));
	}
})
Template.notificacoes.onCreated(function(){
	Session.setDefault('notificacoesTab', 'pendentes');
})