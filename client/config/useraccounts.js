
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
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
      _id: 'email',
      type: 'email',
      required: true,
      re: /.+@(.+){2,}\.(.+){2,}/,
  },  
  {
      _id: "username",
      type: "text",
      displayName: "Usuário",
      required: true,
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      displayName: "Username ou Email",
      placeholder: "Username ou Email"
  },
  {
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    displayName: 'Senha',
    errStr: 'Mínimo de 6 caracteres',
  },  
  {
      _id: "celular",
      type: "tel",
      template: "atInputIntlTel",
      required: true,
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
    showForgotPasswordLink: false,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,
    hideSignUpLink: true,
    hideSignInLink: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    preSignUpHook: preSignUpHook,
    onSubmitHook: onSubmitHook,
    // Privacy Policy and Terms of Use

    onLogoutHook: onLogoutHook,
    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,
    texts: {
      inputIcons: {
        isValidating: '',
        hasError: 'ion-close-round',
        hasSuccess: 'ion-checkmark-round',
      },
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
Template.myAtTextInput.replaces("atTextInput");

T9n.setLanguage('pt')