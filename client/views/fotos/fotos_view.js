Template.fotosView.helpers({
	half:function(value){
		return value/2
	},
	candidatos:function(){
		return Session.get('candidatos');
	},
	borderStyle:function(){
		return (this.userId)?"solid":"dashed";
	},
	borderColor: function(){
		return (this.userId && this.userId == Meteor.userId()) ? "#84bd00": "#d3d3d3";
	},
	tagSelecionada: function(){
		return Tags.findOne({_id: Session.get('tagSelecionada')});
	},
	mostrarTags: function() {
		return Session.get('mostrarTags');
	},
	onLoadImage: function() {
		var instance = Template.instance();
		return function() {
			instance.loadedImage.set(true);
		}
	},
	loadedImage: function() {
		return Template.instance().loadedImage.get();
	}
})

Template.ionNavBar.events({
	'click #toggle-tags':function(){
		Session.set('mostrarTags', !Session.get('mostrarTags'));
	}
})

Template.fotosView.onCreated(function() {
	this.loadedImage = new ReactiveVar();
	this.loadedImage.set(false);
});
Template.fotosView.onRendered(function(){
	Session.set('candidatos','');
	Session.set('tagSelecionada','');

})
Template.fotosView.events({
	'click .tag':function(){
		Session.set('candidatos',this.candidatos);
		Session.set('tagSelecionada',this._id);
	}
})