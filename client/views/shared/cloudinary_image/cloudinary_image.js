
Template.cloudinaryImg.events({
	'load .user-image':function(e,template){
		template.loadingImg.set(false);
		
	}
})

Template.cloudinaryImg.helpers({
	loadingImg:function(){

		return Template.instance().loadingImg.get();
	}
})

Template.cloudinaryImg.onCreated(function(){
	this.loadingImg = new ReactiveVar(true);
})