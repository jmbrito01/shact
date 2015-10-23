Template.nossasFotos.onRendered(function(){
    var swpNossasFotos = new Swiper('.nossas-fotos', {
        slidesPerColumn: 1,
        paginationClickable: true,
        spaceBetween: 10,
        slidesPerView: 'auto',   
    });		

    var templatesNossasFotos = {};
    var self = this;

    console.log(this.data);
    var perfis = this.data.perfis;

    this.nossasFotosObserver = Fotos.find().observeChanges({
        added: function(id, fields){  
            var doc = function(){
                return Fotos.findOne({_id:id});
            }

            swpNossasFotos.appendSlide('<div class="swiper-slide" id="slide-nossas-fotos' + id + '"></div>');
            var parentSlideNossasFotos = self.$('#slide-nossas-fotos' + id).get(0);
            templatesNossasFotos[id] = Blaze.renderWithData(Template.nossasFotosItem, doc, parentSlideNossasFotos);

            swpNossasFotos.update(true);
        },
        removed: function(id){
            var slideNossasFotos = self.$('#slide-nossas-fotos' + id).index();

            $("#slide-nossas-fotos" + id).fadeOut(function(){
                swpNossasFotos.removeSlide(slideNossasFotos);  
                swpNossasFotos.update(true);
                Blaze.remove(templatesNossasFotos[_id]);
            });
        },
        changed:function(doc){
            
        }
    });
})

Template.nossasFotos.onDestroyed(function(){
    this.nossasFotosObserver.stop();
})
