const TEXTO_THROTTLE = 500;
const SLIDER_THROTTLE = 500;
const RAIO_MIN = 0;
const RAIO_MAX = 1000;
var options = {
	keepHistory: 1000 * 5,
	localSearch: true
};
var fields = ['name'];

ShactSearch = new SearchSource('shacters', fields, options);

fazerBusca = function(){
	var textoBusca = Session.get('textoBusca');
	var raio = Session.get('raio');
	ShactSearch.search(textoBusca,{raio: raio});
}


Template.geoBusca.helpers({
	resultados: function() {
		return ShactSearch.getData({
			transform: function(matchText, regExp) {
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {_score: -1}
		});
	},
	raioMin: function(){
		return RAIO_MIN;
	},
	raioMax: function(){
		return RAIO_MAX
	},
	isLoading: function() {

		return ShactSearch.getStatus().loading;
	},	  
});


Template.geoBusca.events({
	"keyup #texto-busca": _.throttle(function(e) {
		var textoBusca = $(e.target).val();
		Session.set('textoBusca', textoBusca);
	}, TEXTO_THROTTLE),
	'input #slider-raio': _.throttle(function(e){
		var raio = parseInt($(e.target).val());
		console.log(raio);
		Session.set('raio',raio);
	}, SLIDER_THROTTLE),	
	'click .user-add':function(){
		tentarConexao(this._id, METODO_GEO);
	},
	'click #refresh-busca': function(){
		ShactSearch.cleanHistory();
		fazerBusca();
	}
})

Template.geoBusca.onRendered(function(){
	Session.setDefault('textoBusca', '');
	Session.setDefault('raio', 100);

	this.autorun(fazerBusca);
})


Template.ionNavBar.events({
	'click #configurar-radar':function(){
		Session.set('configurarRadar', !Session.get('configurarRadar'));
	}
})