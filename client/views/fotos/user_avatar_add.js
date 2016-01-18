Template.userAvatarAdd.events({
	'click .adicionar-user': function(){
		console.log(this);
		tentarConexao(this._id);
	},	
})