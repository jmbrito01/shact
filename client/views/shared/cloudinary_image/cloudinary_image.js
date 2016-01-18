
Template.cloudinaryImg.events({
	'load .cloudinary-image':function(e,template){
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
  this.data.sHeight = this.data.sHeight || this.data.height;
  this.data.sWidth = this.data.sWidth || this.data.width;
})

Template.cloudinaryImg.onRendered(function() {
  if (this.data.onLoad && typeof this.data.onLoad === 'function') {
    $('.cloudinary-image').load(this.data.onLoad)  ;
  }
  
})