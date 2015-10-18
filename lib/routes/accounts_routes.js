Router.plugin('ensureSignedIn', {
    except: ['signIn', 'signUp', 'atForgotPassword']
});

AccountsTemplates.configure({
    defaultLayout: 'plainLayout',
});


AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/',
    template: 'signIn',
    redirect: '/home',
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signUp',
    path: '/signup',
    template: 'signUp',
    redirect: '/home',
});


AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "",
        signUp: "Sign Up Title",
        verifyEmail: "Verify Email Title",
      }
    }
});



