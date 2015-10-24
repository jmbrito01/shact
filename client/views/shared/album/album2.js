Template.album2.helpers({
	params1:function(){
        return {
            template: Template.albumPortrait,
            options : {
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 0, 
		    },
            'class': 'album-portrait',
            id: 'album-portrait',
            collection: Fotos,
            selector: {userId: Meteor.userId(),tipo:0},
            fields: {fields: {imagem:1}},
            buttons:true
        }
	},
	params2:function(){
        return {
            template: Template.albumThumbs,
            options :  {
		        spaceBetween: 0,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        touchRatio: 0.2,
		        slideToClickedSlide: true,
		        
		    },
            'class': 'album-thumbs',
            id: 'album-thumbs',
            collection: Fotos,
            selector: {userId: Meteor.userId(),tipo:0},
            fields: {fields: {imagem:1}}
        }
	}
})

Template.album2.onRendered(function(){
	albumPortrait = $('#album-portrait')[0].swiper;
	albumThumbs = $('#album-thumbs')[0].swiper;
    albumPortrait.params.control = albumThumbs;
    albumThumbs.params.control = albumPortrait;	
})