App.accessRule('*');

App.info({
  id: 'com.shact.app',
  name: 'shact',
  description: 'Conecte-se',
  author: 'Rafael R. Correia',
  email: 'rafael.correia.poli@gmail.com',
  website: 'http://example.com'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');


App.icons({
  // Resolução: 60x60
  "iphone": "private/images/icons/iphone.png",
  // Resolução: 120x120
  "iphone_2x": "private/images/icons/iphone_2x.png",
  // Resolução: 180x180
  "iphone_3x": "private/images/icons/iphone_3x.png",
  // Resolução: 72x72
  "ipad": "private/images/icons/ipad.png",
  // Resolução: 144x144
  "ipad_2x": "private/images/icons/ipad_2x.png",
  // Resolução: 36x36
  "android_ldpi": "private/images/icons/android_ldpi.png",
  // Resolução: 48x48
  "android_mdpi": "private/images/icons/android_mdpi.png",
  // Resolução: 72x72
  "android_hdpi": "private/images/icons/android_hdpi.png",
  // Resolução: 96x96
  "android_xhdpi": "private/images/icons/android_xhdpi.png"
});
App.launchScreens({
  // Resolução: 320x480
  "iphone": "private/images/launch/iphone.png",
  // Resolução: 640x960
  "iphone_2x": "private/images/launch/iphone_2x.png",
  // Resolução: 640x1136
  "iphone5": "private/images/launch/iphone5.png",
  // Resolução: 750x1334
  "iphone6": "private/images/launch/iphone6.png",
  // Resolução: 768x1024
  "ipad_portrait": "private/images/launch/ipad.png",
  // Resolução: 1536x2048
  "ipad_portrait_2x": "private/images/launch/ipad_2x.png",
  // Resolução: 200x320
  "android_ldpi_portrait": "private/images/launch/android_ldpi.png",
  // Resolução: 320x480
  "android_mdpi_portrait": "private/images/launch/android_mdpi.png",
  // Resolução: 480x800
  "android_hdpi_portrait": "private/images/launch/android_hdpi.png",
  // Resolução: 720x1280
  "android_xhdpi_portrait": "private/images/launch/android_xhdpi.png"
});