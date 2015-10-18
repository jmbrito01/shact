
var meldDBCallback = function(src_user_id, dst_user_id){
};

var novoService = function(userId, service){
	console.log("MELD");
	console.log(service);
	var compartilhavel = Compartilhaveis.findOne({service: service});
	console.log(compartilhavel);
	console.log(compartilhavel.campoPerfil);
	var valor = Meteor.user().services[service][compartilhavel.campoPerfil];

	Perfis.insert({
		userId: userId,
		compartilhavelId: compartilhavel._id,
		valor: valor
	})
	
};


var serviceAddedCallback = function(user_id, service_name){
console.log("YES!");
};



AccountsMeld.configure({
    serviceAddedCallback: novoService,
    askBeforeMeld:false
});
