



Router.configure({
  // this will be the default controller
  controller: 'ApplicationController'
});

ApplicationController = RouteController.extend({
  layoutTemplate: 'defaultLayout',

  onBeforeAction: function () {
    // do some login checks or other custom logic
    this.next();
  }
});



Router.route('/home', function(){
	this.render('home');
},{
	name: 'home',
});

Router.route('/compartilhaveis', function(){
	this.render('compartilhaveis');
},{
	name: 'compartilhaveis.index'
});


Router.route('/geo/busca', function(){
	this.render('geoBusca');
},{
  name: 'geo.busca'
});

Router.route('/selfie/busca', function(){
	this.render('selfieBusca');
},{
  name: 'selfie.busca'
});



Router.route('/configuracoes', function(){
	this.render('configuracoes');
},{
  name: 'configuracoes.index'
});



Router.route('/users/:userId/view', function(){
	this.render('usersView', {
		data: function(){
			return Meteor.users.findOne({_id: this.params.userId}) || Meteor.user();
		}
	});
},{
	name: 'users.view',
});


Router.route('/users/:userId/fotos', function(){
	this.render('usersFotos', {
		data: function(){
			return Meteor.users.findOne({_id: this.params.userId}) || Meteor.user();
		}
	});
},{
	name: 'users.fotos',
});


Router.route('/users/:userId/perfis', function(){
	this.render('usersPerfis', {
		data: function(){
			return Meteor.users.findOne({_id: this.params.userId}) || Meteor.user();
		}
	});
},{
	name: 'users.perfis',
});

