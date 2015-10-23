const MODO_SELFIE = 0;
const MODO_GEO = 1;
const MODO_TELEFONE = 2;

Template.home.onRendered(function(){
	Session.setDefault('modoBusca',MODO_SELFIE);
	
	var swiper = new Swiper('.selecionar-modo',{
		initialSlide: Session.get('modoBusca'),
		onSlideChangeEnd:function(swiper){
			Session.set('modoBusca',swiper.activeIndex);
		}
	});
});

Template.home.events({
	'click .busca-selfie':function(){
		Router.go('selfie.busca');
	},
	'click .busca-geo':function(){
		Router.go('geo.busca');
	},
	'click .busca-telefone':function(){
		Router.go('telefone.busca');
	}
})