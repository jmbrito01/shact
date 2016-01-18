var ultimaFoto = function(swiper) {
  var fotoPublicaSelecionada = Session.get('fotoPublicaSelecionada');
  if (!fotoPublicaSelecionada) {
    Session.set('fotoPublicaSelecionada', $(swiper.slides[swiper.activeIndex]).data('_id'));
  } else {
    var lastId = swiper.slides.filter('[data-_id="' + fotoPublicaSelecionada + '"]').index();
    swiper.slideTo(lastId);
  }
};

Template.fotosPublicas.helpers({
  options1: function() {
    return {
      observer: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 0,

      onSlideChangeStart: function(swiper) {
        Session.set('fotoPublicaSelecionada', $(swiper.slides[swiper.activeIndex]).data('_id'));
      },
      onInit: ultimaFoto
    };
  },
  options2: function() {
    return {
      observer: true,
      spaceBetween: 0,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: false,
      onInit: ultimaFoto
    };
  },
  fotos: function() {
    var query = Router.current().params.query;
    var participantes = [Meteor.userId()];
    if (query.com) participantes.push(query.com);

    console.log(participantes);
    var fotos = Fotos.find({
      tipo: TIPO_PUBLICO,
      'participantes.userId': {
        $all: participantes
      }
    });

    if (fotos.count() === 1) {
        var fotosArray = fotos.fetch();
        Session.set('fotoPublicaSelecionada', fotosArray[0]._id);
    }else if (fotos.count() === 0) {
        Session.set('fotoPublicaSelecionada', '');
    }

    return fotos;
  },
  fotoPublicaSelecionada: function() {
    return Fotos.findOne({
      _id: Session.get('fotoPublicaSelecionada')
    });
  }
});


Template.fotosPublicas.onRendered(function() {
  fotosPublicasItem = this.$('#fotos-publicas-item')[0].swiper;
  fotosPublicasThumbs = this.$('#fotos-publicas-thumbs')[0].swiper;
  fotosPublicasItem.params.control = fotosPublicasThumbs;
  fotosPublicasThumbs.params.control = fotosPublicasItem;

  this.$('#fotos-publicas-item').height($(window).width() * 3 / 4);
});
