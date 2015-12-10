AutoForm.hooks({
  updateUsersForm: {
    onSuccess() {
      Router.go('user.index');
    },
    onError(){

    }
  }
})