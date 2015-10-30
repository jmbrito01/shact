Template.conexoesView.helpers({
	compartilharMais:function(){
		return Session.get('compartilharMais');
	}
})

Template.conexoesView.events({
	'click #compartilhar-mais':function(){
		Session.set('compartilharMais',!Session.get('compartilharMais'));
	}
})
Template.conexoesView.onCreated(function(){
	Session.set('compartilharMais', false);
})