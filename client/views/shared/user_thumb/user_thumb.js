
Template.userImage.events({
	'load .user-image':function(e,template){
		template.loadingImg.set(false);
		
	}
})

Template.userImage.helpers({
	loadingImg:function(){

		return Template.instance().loadingImg.get();
	}
})

Template.userImage.onCreated(function(){
	this.loadingImg = new ReactiveVar(true);
})