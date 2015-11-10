function ultimoPerfil(swiper){
    var compartilhavelSelecionado = Session.get('compartilhavelSelecionado');
    if (!compartilhavelSelecionado){
        Session.set('compartilhavelSelecionado', $(swiper.slides[swiper.activeIndex]).data('_id'));
    }else{
        var lastId = swiper.slides.filter('[data-_id="' + compartilhavelSelecionado + '"]').index()
        swiper.slideTo(lastId);
    }
}
Template.userPerfis.helpers({
	options1:function(){
        return {
            observer:true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 0, 
            onSlideChangeEnd:function(swiper){
                Session.set('compartilhavelSelecionado', $(swiper.slides[swiper.activeIndex]).data('_id'));
            },
            onInit: ultimoPerfil
        }
	},
	options2:function(){
        return {
            observer:true,
            spaceBetween: 0,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: false,        
            onInit:ultimoPerfil
        }
	},
    compartilhavelSelecionado:function(){
        return Compartilhaveis.findOne({_id: Session.get('compartilhavelSelecionado')});
    },
    compartilhaveis:function(){
        return Compartilhaveis.find();
    },
    semCor: function(){
        return !this.meuPerfil();
    }
})

Template.userPerfis.onRendered(function(){
	cadastrarPerfisItem = $('#cadastrar-perfis-item')[0].swiper;
	cadastrarPerfisThumbs = $('#cadastrar-perfis-thumbs')[0].swiper;
    cadastrarPerfisItem.params.control = cadastrarPerfisThumbs;
    cadastrarPerfisThumbs.params.control = cadastrarPerfisItem;	
})