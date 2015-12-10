
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Usuário",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      re: /.+@(.+){2,}\.(.+){2,}/,
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      displayName: "Username ou Email",
      placeholder: "Username ou Email"
  },
  pwd
  ,  
  {
      _id: "nome",
      type: "text",
      required: true,
  },
  {
      _id: "sobrenome",
      type: "text",
      required: true,
  },    
  {
      _id: "celular",
      type: "tel",
      template: "atInputIntlTel",
      options: {
        intlTelOptions: {
          autoFormat: true,
          defaultCountry: 'BR',
          utilsScript: 'lib/libphonenumber/build/utils.js'
        },
      },
  },
]);

var onSubmitHook = function(error, state){
  if (!error) {
    if (state === "signIn") {
      var localizacao = Location.getLastPosition();
      localizacao = {
        latitude: localizacao.latitude,
        longitude:localizacao.longitude
      }
      console.log("localizacao...");
      console.log(localizacao);
      Meteor.call('setLocalizacao',localizacao);
    }
    if (state === "signUp") {
      var localizacao = Location.getLastPosition();
      localizacao = {
        latitude: localizacao.latitude,
        longitude:localizacao.longitude
      }
      console.log("localizacao...");
      console.log(localizacao);
      Meteor.call('setLocalizacao',localizacao);
    }
  }
};


//HOOK ANTES DE ENVIAR FORMULARIO DE CADASTRO, NO LADO DO CLIENTE
preSignUpHook = function(password,info){
  /*
  var gps = Location.getLastPosition();
  var localizacao = {
    latitude: gps.latitude,
    longitude:  gps.longitude
  }
  console.log(info);
  info = _.extend(info,{localizacao:localizacao});
  */
}

onLogoutHook = function(){
    Router.go('signIn');
}

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    overrideLoginErrors: false,

    // Appearance
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    preSignUpHook: preSignUpHook,
    onSubmitHook: onSubmitHook,
    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    onLogoutHook: onLogoutHook,
    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,
    texts: {
      title: {
        changePwd: '',
        enrollAccount: '',
        forgotPwd: '',
        resetPwd: '',
        signIn: '',
        signUp: '',
        verifyEmail: ''
      }
    }    
});



Template.myAtForm.replaces("atForm");


T9n.setLanguage('pt')