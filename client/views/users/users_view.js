Template.usersView.helpers({
	titulo:function(){
		console.dir(this);

		return (this._id==Meteor.userId()) ? 'Meu Perfil' : this.profile.nome;

	},
	temFotos:function(){
		console.log(this.profile.fotos.length);
		return (this.profile.fotos.length);
	}
})

Template.usersView.onRendered(function(){
	console.log(this.data);
})

Template.ionNavBar.events({
	'click #editar-perfil':function(){
		Session.set('editarPerfil', !Session.get('editarPerfil'));
	}
})