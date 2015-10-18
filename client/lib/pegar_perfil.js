loginCom = function(service,callback){
	switch(service){
		case 'twitter':
			Meteor.loginWithTwitter();
		break;
		case 'google':
			Meteor.loginWithGoogle(function(){
				console.log("success!");
			});
		break;
		case 'facebook':
			Meteor.loginWithFacebook();
		break;
		case 'linkedin':
			Meteor.loginWithLinkedin();
		break;
		case 'instagram':
			Meteor.loginWithInstagram();
		break;
		case 'yammer':
			Meteor.loginWithYammer();
		break;
		case 'spotify':
			Meteor.loginWithSpotify();
		break;			
		case 'lastfm':
			Meteor.loginWithLastfm();
		break;			
		case 'github':
			Meteor.loginWithGithub();
		break;
		case 'meetup':
			Meteor.loginWithMeetup();
		break;		
		case 'whatsapp':
			//var cellphone = Meteor.user().profile.cellphone;
			//Meteor.call('insertNetworkProfile',networkId, cellphone,false);
		break;
	}
}


