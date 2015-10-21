var fotosGrandes;
var fotosThumbs;

Template.albumItemGrande.events({
    'click .acoes-album-item':function(){
        console.log(this);
        var self = this;

        var texto, acao;

        if (Meteor.user().profile.avatar==self._id){
            texto = 'Remover do perfil';
            acao = function(){
                Meteor.call('setAvatar','');
            }
        }else{
            texto = 'Setar perfil';
            acao = function(){
                Meteor.call('setAvatar',self._id);
            }            
        }
        IonActionSheet.show({
          titleText: 'Foto',
          buttons: [
            { text: texto},
          ],

          destructiveText: '<i class="icon ion-trash-outline"></i> Deletar',
          cancelText: 'Cancel',
          cancel: function() {
            console.log('Cancelled!');
          },
          destructiveButtonClicked: function() {
            console.log("AQUI!");
            Meteor.call('removerFoto',self._id);
            return true;
          },
          buttonClicked: function(index) {
            if (index === 0) {
              acao();
            }
            return true;
          },          
        });
    }
})

Template.albumItemGrande.helpers({
    mostrarAcoes:function(){
        console.log(!Fotos.find({userId: Meteor.userId()}).count());    
        return Session.get('mostrarAcoes') || !Fotos.find({userId: Meteor.userId()}).count();
    },
    foto: function(){
        return Fotos.findOne({_id: this.fotoId});
    },
    icon : function(){
        if (this.reconhecimento.status==1){
            return 'fa fa-cog fa-spin';
        }else if(this.reconhecimento.status==2){
            return 'fa fa-tag';
        } else if (this.reconhecimento.status==3){
            return 'fa fa-times';
        }

    }
})


Template.albumItemThumb.helpers({
    isAvatar:function(){
        return (Meteor.user().profile.avatar==this._id);
    },
    foto: function(){
        return Fotos.findOne({_id: this.fotoId});
    },    
})


Template.album.onRendered(function(){
    fotosGrandes = new Swiper('.fotos-grandes', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        
    });
    fotosThumbs = new Swiper('.fotos-thumbs', {
        spaceBetween: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        
    });
    fotosGrandes.params.control = fotosThumbs;
    fotosThumbs.params.control = fotosGrandes;


    slides = []; 
    
    var slideMap = [];


    this.fotosObserver = Fotos.find({userId: Meteor.userId()},{fields: {imagem:1}}).observeChanges({
        added: function(id, fields){  
            var foto = Fotos.findOne({_id:id});
            console.log("added!", id, fields);


            var albumItem = {
                publicId: foto.imagem.publicId,
                _id: foto._id,
                status: foto.reconhecimento.status
            }

            fotosGrandes.appendSlide('<div class="swiper-slide" id="slide-foto-grande-'+foto._id+'"></div>');
            Blaze.renderWithData(Template.albumItemGrande, {fotoId: foto._id}, document.getElementById('slide-foto-grande-' + foto._id))

            fotosThumbs.appendSlide('<div class="swiper-slide" id="slide-foto-thumb-'+foto._id+'"></div>');
            Blaze.renderWithData(Template.albumItemThumb, {fotoId: foto._id}, document.getElementById('slide-foto-thumb-' + foto._id))

            var slideObj = {
                id: foto._id,
                slide: fotosGrandes.slides.length-1
            }
            slideMap.push(slideObj);


            if (Meteor.user().profile.avatar==foto._id){
                console.log(fotosGrandes.slides.length);
                fotosGrandes.slideTo(fotosGrandes.slides.length-1);
            }

            fotosGrandes.update(true);
            fotosThumbs.update(true);
        },
        removed: function(id){
            var currentSlide = _.findWhere(slideMap,{id: id});
            if (!currentSlide) console.log("FODEU!");
            var slide = currentSlide.slide;

            console.log(currentSlide);

            
            $("#slide-foto-grande-" + id).fadeOut(function(){
                fotosGrandes.removeSlide(slide);  
                fotosGrandes.update(true);
            });
            $("#slide-foto-thumb-" + id).fadeOut(function(){
                fotosThumbs.removeSlide(slide);
                fotosThumbs.update(true);
            });


            for (i=slide;i<slideMap.length;i++){
                slideMap[i].slide = slideMap[i].slide - 1
            }
            slideMap.splice(slide,1);

        },
        changed:function(doc){
            console.log("changed!");
        }
    });

})



Template.album.onDestroyed(function(){
    this.fotosObserver.stop();
})