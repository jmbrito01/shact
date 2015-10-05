Template.navbar.onRendered(function(){
	$(".button-collapse").sideNav();
});

Template.navbar.events({
	'click #logout':function(){
		$('.button-collapse').sideNav('hide');
		AccountsTemplates.logout();
		FlowRouter.redirect('signIn');
	}
})