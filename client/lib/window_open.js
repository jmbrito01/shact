  var windowOpen = function(deepLink) {
    return window.open(deepLink, '_system', 'location=no');
  }


  shellApp = function(service, profile) {

    var alertProfile = function() {
      IonPopup.alert({
        title: 'O perfil é:',
        template: '<b>' + profile + '</b>',
        okText: 'Ok'
      });
    }

    switch (service) {
      case 'pinterest':
        alertProfile();
      break;
      case 'tumblr':
        alertProfile();
      break;
      case 'yammer':
        alertProfile();
      break;
      case 'github':
        alertProfile();
      break;
      case 'spotify':
        alertProfile();
      break;
      case 'cel':
        return windowOpen('tel:' + profile);
      break;
      case 'mail':
        return windowOpen('mailto:' + profile);
      break;
      case 'facebook':
        return windowOpen('fb://profile/' + profile);
        break;
      case 'twitter':
        return windowOpen('twitter://user?screen_name=' + profile);
        break;
      case 'linkedin':
        return windowOpen('linkedin://profile?id=' + profile);
        break;
      case 'google':
        return windowOpen('http://plus.google.com/u/0/' + profile + '/posts');
        break;
      case 'instagram':
        return windowOpen('instagram://user?username=' + profile);
        break;
      case 'lastfm':
        alertProfile();
        break;
      case 'youtube':
        alertProfile();
        return windowOpen('http://www.youtube.com/user/' + profile);
        break;
      case 'snapchat':
        alertProfile()
        break;
      case 'skype':
        return windowOpen('skype:' + profile + '?call');
        break;
      case 'whatsapp':
        alertProfile();
        break;
    }
  }
