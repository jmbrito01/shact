Template.selecionarPerfis.helpers({
    options1:function(){
        return {
            observer:true,
            slidesPerColumn: 1,
            paginationClickable: true,
            spaceBetween: 0,
            slidesPerView: 'auto'            
        }
    },  
    perfis: function(){
        return Perfis.find({userId: Meteor.userId()});
    }
})

Template.selecionarPerfis.onDestroyed(function() {
    ultimaAcao.set({});
})