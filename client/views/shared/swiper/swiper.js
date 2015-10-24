Template.swiper.onRendered(function(){
    var options = this.data.options || {};
    var id = this.data.id;
    
    var swiper = new Swiper('#' + id, options);		
})