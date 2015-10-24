Template.perfisRecebidos.helpers({
    params:function(){
        var perfis = Template.instance().data.perfis || [];
        console.log(Template.instance().data);

        return {
            template: Template.perfilRecebidoItem,
            options : {
                slidesPerColumn: 1,
                paginationClickable: true,
                spaceBetween: 0,
                slidesPerView: 'auto',                  
            },
            'class': 'perfis-recebidos',
            id: 'perfis-recebidos',
            collection: Perfis,
            selector: {_id: {$in: perfis}, userId: {$ne:Meteor.userId()}}
        }
    }
})


/*
Template.perfisRecebidos.onRendered(function(){
    var swpPerfisRecebidos = new Swiper('.perfis-recebidos', {
        slidesPerColumn: 1,
        paginationClickable: true,
        spaceBetween: 0,
        slidesPerView: 'auto',   
    });		

    var templatesPerfil = {};
    var self = this;

    console.log(this.data);
    var perfis = this.data.perfis;

    this.perfilObserver = Perfis.find({_id: {$in: perfis}}).observeChanges({
        added: function(id, fields){  
            var doc = function(){
                return Perfis.findOne({_id:id});
            }

            swpPerfisRecebidos.appendSlide('<div class="swiper-slide" id="slide-perfil-recebido-' + id + '"></div>');
            var parentSlidePerfil = self.$('#slide-perfil-recebido-' + id).get(0);
            templatesPerfil[id] = Blaze.renderWithData(Template.perfilRecebidoItem, doc, parentSlidePerfil);

            swpPerfisRecebidos.update(true);
        },
        removed: function(id){
            var slideAvatar = self.$('#slide-perfil-recebido-' + id).index();

            $("#slide-perfil-recebido-" + id).fadeOut(function(){
                swpPerfisRecebidos.removeSlide(slideAvatar);  
                swpPerfisRecebidos.update(true);
                Blaze.remove(templatesPerfil[_id]);
            });
        },
        changed:function(doc){
            
        }
    });
})

Template.perfisRecebidos.onDestroyed(function(){
    this.perfilObserver.stop();
})
*/