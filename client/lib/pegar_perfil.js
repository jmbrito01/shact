
document.addEventListener('deviceready', function(){
	console.log(' device ready ');
	document.addEventListener("resume", function() {
		console.log(' resume ');
		sAlert.success("onResume");
		$('.content').height('100%');
	}, false);

})

loginCom = function(service,callback){
	switch(service){
		case 'twitter':
			Meteor.loginWithTwitter(callback);
		break;
		case 'google':
			Meteor.loginWithGoogle(function(){
				console.log("success!");
			});
		break;
		case 'facebook':
			Meteor.loginWithFacebook(callback);
		break;
		case 'linkedin':
			Meteor.loginWithLinkedin(callback);
		break;
		case 'instagram':
			Meteor.loginWithInstagram(callback);
		break;
		case 'yammer':
			Meteor.loginWithYammer(callback);
		break;
		case 'spotify':
			Meteor.loginWithSpotify(callback);
		break;			
		case 'lastfm':
			Meteor.loginWithLastfm(callback);
		break;			
		case 'github':
			Meteor.loginWithGithub(callback);
		break;	
		case 'whatsapp':
			//var cellphone = Meteor.user().profile.cellphone;
			//Meteor.call('insertNetworkProfile',networkId, cellphone,false);
		break;
	}
}


