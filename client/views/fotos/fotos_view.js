Template.fotosView.helpers({
	half:function(value){
		return value/2
	},
	candidatos:function(){
		return Session.get('candidatos');
	}
})

Template.fotosView.events({
	'click .tag':function(){
		Session.set('candidatos',this.candidatos);
	}
})