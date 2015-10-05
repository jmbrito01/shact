const GPS_FILTRO_TEMPO = 0.5;
const GPS_FILTRO_ACURACIA = 50;
const GPS_FILTRO_DISTANCIA = 5;

Meteor.startup(function(){
	var gpsHabilitado = function(state){
		//if android
	   if(state === 'Enabled') {
	      console.log("GPS Is Enabled");	      
	   }
	}
	var gpsDesabilitado = function(){
		console.log("Failed to get the GPS State");
	}

	var pegouLocalizacao = function(localizacao){
		Location.enableAccuracyFilter(GPS_FILTRO_ACURACIA);
		Location.enableDistanceFilter(GPS_FILTRO_DISTANCIA);
		Location.enableTimeFilter(GPS_FILTRO_TEMPO);		

		if (Meteor.userId()){
			console.log("SENDING POOSITION (WATCH)",localizacao);
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
