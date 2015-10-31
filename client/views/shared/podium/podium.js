Template.podium.helpers({
    user: function(){
        return Meteor.users.findOne({_id: this.userId});
    },
    pendente: function(){
    	console.log(this);
    	return (this.status===0);
    },
    amigos: function(){
    	return (this.status===1);
    },    
})

Template.podium.events({
	'click #marcar' : function(e,tmpl){
		e.stopPropagation();
		var tagId = Session.get('tagSelecionada');
		console.log(tagId);
		console.log(this.userId);
		Meteor.call('atribuirTag', tagId, this.userId, function(err,res){
			console.log(err);
			if (!err && res){
				console.log("SUCESSO!");
			}
		});
	}
})