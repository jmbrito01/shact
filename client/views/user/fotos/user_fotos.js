function ultimaFoto(swiper){
    var fotoSelecionada = Session.get('fotoSelecionada');
    if (!fotoSelecionada){
        Session.set('fotoSelecionada', $(swiper.slides[swiper.activeIndex]).data('_id'));
    }else{
        var lastId = swiper.slides.filter('[data-_id="' + fotoSelecionada + '"]').index()
        swiper.slideTo(lastId);
    }    
}

Template.userFotos.helpers({
    options1:function(){
        return {
            observer:true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 0, 
            onSlideChangeStart:function(swiper){
                Session.set('fotoSelecionada', $(swiper.slides[swiper.activeIndex]).data('_id'));
            },
            onInit : ultimaFoto        
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
            onInit: ultimaFoto
        }
    },
    fotos:function(){
        return Fotos.find({userId: Meteor.userId(), tipo:0},{imagem:1});
    },
    fotosCount: function() {
      return Fotos.find({userId: Meteor.userId(), tipo:0},{imagem:1}).count();  
    },
    fotoSelecionada:function(){
        return Fotos.findOne({_id: Session.get('fotoSelecionada')});
    }
})


Template.userFotos.onRendered(function(){
    userFotosItem = $('#user-fotos-item')[0].swiper;
    userFotosThumbs = $('#user-fotos-thumbs')[0].swiper;
    userFotosItem.params.control = userFotosThumbs;
    userFotosThumbs.params.control = userFotosItem;     
})