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
      case 'cel':
        return windowOpen('tel:' + profile);
      break;
      case 'facebook':
        return windowOpen('fb://profile/' + profile);
        break;
      case 'twitter':
        return windowOpen('twitter://user?screen_name=' + profile);
        break;
      case 'linkedin':
        return windowOpen('linkedin://profile/' + profile);
        break;
      case 'google':
        return windowOpen('http://plus.google.com/u/0/' + profile + '/posts');
        break;
      case 'instagram':
        return windowOpen('instagram://user?username=' + profile);
        break;
      case 'lastfm':
        alertProfile()
        break;
      case 'youtube':
        return windowOpen('https://www.youtube.com/user/' + profile);
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
