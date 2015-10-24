Template.user.helpers({
	titulo:function(){
		return (this._id==Meteor.userId()) ? 'Meu Perfil' : this.profile.nome;

	},
	temFotos:function(){
		return (this.profile.fotos.length);
	}
})

Template.user.onRendered(function(){
	
})

Template.ionNavBar.events({
	'click #editar-perfil':function(){
		Session.set('editarPerfil', !Session.get('editarPerfil'));
	}
})