const GPS_FILTRO_TEMPO = 0.5;
const GPS_FILTRO_ACURACIA = 50;
const GPS_FILTRO_DISTANCIA = 5;

Meteor.startup(function(){
	var gpsHabilitado = function(state){
		//if android
	   if(state === 'Enabled') {
	      console.log("GPS Is Enabled");	      
			//Location.enableAccuracyFilter(GPS_FILTRO_ACURACIA);
			//Location.enableDistanceFilter(GPS_FILTRO_DISTANCIA);
			//Location.enableTimeFilter(GPS_FILTRO_TEMPO);			      
	   }
	}
	var gpsDesabilitado = function(){
		console.log("Failed to get the GPS State");
	}

	var pegouLocalizacao = function(localizacao){

		console.log("Got watch position");

		if (Meteor.userId()){
			//console.log("SENDING POOSITION (WATCH)",localizacao);
			var localizacao = {
				latitude: localizacao.latitude,
				longitude: localizacao.longitude
			}

			Meteor.call('setLocalizacao',localizacao);
		}
	}

	var erroPegandoLocalizacao = function(err){
		console.log("ERROR GETTING POSITION", err);
	}

	Location.getGPSState(gpsHabilitado, gpsDesabilitado, {dialog:true});
	Location.startWatching(pegouLocalizacao, erroPegandoLocalizacao);		
});

var geo_options = {
  enableHighAccuracy: true, 
};

Location.setGetPositionOptions(geo_options);



//https://maps.googleapis.com/maps/api/staticmap?center=-23.6332358,-46.7140593&zoom=17&size=600x300&sensor=false