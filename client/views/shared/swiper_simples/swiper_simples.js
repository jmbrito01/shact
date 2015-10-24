Template.swiperSimples.onRendered(function(){
    var id = this.data.id;
    var options = this.data.options || {};
    var collection = this.data.collection;
    var selector = this.data.selector || {};
    var fields = this.data.fields;
    var template = this.data.template;

    var swiper = new Swiper('#' + id, options);		

    var templates = {};
    var self = this;

    console.log(collection);
    var domId = id;

    this.swiperObserver = collection.find(selector, fields).observeChanges({
        added: function(id, fields){  
            var doc = function(){
                return collection.findOne({_id:id}, fields);
            }

            swiper.appendSlide('<div class="swiper-slide" id="' + domId + '-' + id + '"></div>');
            var slideDOM = self.$('#' + domId + '-' + id).get(0);
            templates[id] = Blaze.renderWithData(template, doc, slideDOM);

            swiper.update(true);
        },
        removed: function(id){
            var slideId = self.$('#' + domId + '-' + id).index();

            self.$('#' + domId + '-' + id).fadeOut(function(){
                swiper.removeSlide(slideId);  
                swiper.update(true);
                Blaze.remove(templates[_id]);
            });
        },
        changed:function(doc){
            
        }
    });
})

Template.swiperSimples.onDestroyed(function(){
    this.swiperObserver.stop();
})
