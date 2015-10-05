FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn],{except:['home']});

FlowRouter.notFound = {
    action: function() {
    	BlazeLayout.render("plainLayout", {main: "errorPage",errorCode:500});
    }
};

FlowRouter.route('/', {
    name: "home",
    title: "Início",
	triggersEnter:[function(){ 
		console.log("AQUI!");
		if (!Meteor.userId()) FlowRouter.go('signIn');

	}],
    action: function(params) {
    	if (Meteor.userId()){
    		BlazeLayout.render("defaultLayout", {main: "home", botaoEsquerda:"_menu", botaoDireita:"_config"});	
    	}else{
    		FlowRouter.redirect('signIn');
    	}
	    
    },

});
