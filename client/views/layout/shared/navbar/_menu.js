Template._menu.onRendered(function(){
	$(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
});

Template._menu.events({
	'click #logout':function(){
		$('#abrir-menu').sideNav('hide');
		AccountsTemplates.logout();
		FlowRouter.redirect('signIn');
	}
})