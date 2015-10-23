

Template.album.onRendered(function(){

    var albumPortrait = new Swiper('.album-portrait', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        
    });

    var albumThumbs = new Swiper('.album-thumbs', {
        spaceBetween: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        
    });
    albumPortrait.params.control = albumThumbs;
    albumThumbs.params.control = albumPortrait;

    var templatesAvatar = {};
    var templatesThumbs = {};
    var self = this;

    this.fotosObserver = Fotos.find({userId: Meteor.userId(),tipo:0},{fields: {imagem:1}}).observeChanges({
        added: function(id, fields){  
            var doc = function(){
                return Fotos.findOne({_id:id});
            }

            albumPortrait.appendSlide('<div class="swiper-slide" id="slide-album-portrait-' + id + '"></div>');
            var parentSlideAvatar = self.$('#slide-album-portrait-' + id).get(0);
            templatesAvatar[id] = Blaze.renderWithData(Template.albumPortrait, doc, parentSlideAvatar);

            albumThumbs.appendSlide('<div class="swiper-slide" id="slide-album-thumbs-' + id + '"></div>');
            var parentSlideThumbs = self.$('#slide-album-thumbs-' + id).get(0);
            templatesThumbs[id] = Blaze.renderWithData(Template.albumThumbs, doc, parentSlideThumbs);

            /// ????
            if (Meteor.user().profile.avatar==id){
                albumPortrait.slideTo(albumPortrait.slides.length-1);
            }
            //------

            albumPortrait.update(true);
            albumThumbs.update(true);
        },
        removed: function(id){

            var slideAvatar = $("#slide-album-portrait-" + id).index();
            var slideThumbs  = $("#slide-album-thumbs-" + id).index();

            $("#slide-album-portrait-" + id).fadeOut(function(){
                albumPortrait.removeSlide(slideAvatar);  
                albumPortrait.update(true);
                Blaze.remove(templatesAvatar[_id]);
            });
            $("#slide-album-thumbs-" + id).fadeOut(function(){
                albumThumbs.removeSlide(slideThumbs);
                albumThumbs.update(true);
                Blaze.remove(templatesThumbs[_id]);
            });
        },
        changed:function(doc){
            
        }
    });

})

Template.album.onDestroyed(function(){
    this.fotosObserver.stop();
})