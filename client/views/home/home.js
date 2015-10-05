const MODO_SELFIE = 0;
const MODO_GEO = 1;
const MODO_TELEFONE = 2;

Template.home.onRendered(function(){
	console.log("aqui");
	Session.setDefault('modoBusca',MODO_SELFIE);
	
	var swiper = new Swiper('.selecionar-modo',{
		initialSlide: Session.get('modoBusca'),
		onSlideChangeEnd:function(swiper){
			Session.set('modoBusca',swiper.activeIndex);
		}
	});
});

Template.home.events({
	'click #busca-selfie':function(){
		FlowRouter.go('selfie.busca');
	},
	'click #busca-geo':function(){
		FlowRouter.go('geo.busca');
	},
	'click #busca-telefone':function(){
		FlowRouter.go('telefone.busca');
	}
})