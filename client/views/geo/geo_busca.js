const TEXTO_THROTTLE = 500;
const SLIDER_THROTTLE = 500;

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
  jaConectou:function(){
  	return Conexoes.findOne({userIds: {$all :[Meteor.userId(), this._id]}});
  }
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