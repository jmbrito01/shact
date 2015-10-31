Template.userAvatarAdd.events({
	'click .user-avatar': function(){
		console.log(this);
		tentarConexao(this._id);
	},	
})