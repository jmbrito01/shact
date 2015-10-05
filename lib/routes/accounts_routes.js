AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/sign-in',
    template: 'signIn',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signUp',
    path: '/sign-up',
    template: 'signUp',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPwd',
    path: '/reset-password',
    template: 'resetPwd',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
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

