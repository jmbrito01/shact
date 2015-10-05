FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn],{except:['main.index']});

FlowRouter.notFound = {
    action: function() {
    	BlazeLayout.render("plainLayout", {main: "errorPage",errorCode:500});
    }
};

FlowRouter.route('/', {
    name: "main.index",
    title: "Início",
	triggersEnter:[function(){ 
		console.log("AQUI!");
		if (!Meteor.userId()) FlowRouter.go('signIn');

	}],
    action: function(params) {
    	if (Meteor.userId()){
    		BlazeLayout.render("defaultLayout", {main: "home"});	
    	}else{
    		FlowRouter.redirect('signIn');
    	}
	    
    },

});
