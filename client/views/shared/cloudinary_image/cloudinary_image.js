
Template.cloudinaryImg.events({
	'load .cloudinary-image':function(e,template){
		template.loadingImg.set(false);
		
	}
})

Template.cloudinaryImg.helpers({
	loadingImg:function(){
		return Template.instance().loadingImg.get();
	},
  options: function() {
    return {
      width : 100,
      height: 100,
      crop: 'thumb',
      gravity: 'faces'
    }
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

Template.imgFotoCover.onCreated(function() {
  console.log(this.data);
})