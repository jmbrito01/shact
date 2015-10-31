
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      placeholder: "Enter username or email",
      displayName: "Login",
  },
  pwd
  ,  
  {
      _id: "nome",
      type: "text",
      placeholder: "First name",
      required: true,
  },
  {
      _id: "sobrenome",
      type: "text",
      placeholder: "Last name",
      required: true,
  },    
  {
      _id: "celular",
      type: "tel",
      placeholder: "Cellphone"
  },
  {
      _id: "nascimento",
      type: "text",
      placeholder: "Birthday"
  },  
  {
      _id: "genero",
      type: "select",
      displayName: "Gender",
      select: [
          {
              text: "Male",
              value: "male",
          },
          {
              text: "Female",
              value: "female",
          },
      ],
  }  
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

    // Texts
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "Sign In",
        signUp: "Sign Up Title",
        verifyEmail: "Verify Email Title",
      },

      button: {
          signUp: "Done",
          signIn: "Sign In"
      },
		errors: {
		    accountsCreationDisabled: "Client side accounts creation is disabled!!!",
		    cannotRemoveService: "Cannot remove the only active service!",
		    captchaVerification: "Captcha verification failed!",
		    loginForbidden: "error.accounts.Login forbidden",
		    mustBeLoggedIn: "error.accounts.Must be logged in",
		    pwdMismatch: "error.pwdsDontMatch",
		    validationErrors: "Validation Errors",
		    verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
		},
      socialSignUp: "Sign Up",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});



Template.myAtForm.replaces("atForm");