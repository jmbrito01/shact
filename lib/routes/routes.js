



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


// Tabs principais
Router.route('/home', function(){
	this.render('home');
},{
	name: 'home',
});
Router.route('/pendentes', function(){
	this.render('pendentes');
},{
	name: 'pendentes.index'
});

Router.route('/notificacoes', function(){
	this.render('notificacoes');
},{
	name: 'notificacoes.index'
});


Router.route('/contatos', function(){
	this.render('contatos');
},{
	name: 'contatos.index'
});



//
//  Mecanismos de busca
//
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





//
// Ver conexão
//
Router.route('/conexoes/:conexaoId/view', function(){
	this.render('conexoesView', {
		data: function(){
			return Conexoes.findOne({_id: this.params.conexaoId});
		}
	});
},{
	name: 'conexoes.view',
});


//
// Ver foto publica
//
Router.route('/fotos/:fotoId/view', function(){
	this.render('fotosView', {
		data: function(){
			return Fotos.findOne({_id: this.params.fotoId}) || Meteor.user();
		}
	});
},{
	name: 'fotos.view',
});


// Configuracoes
Router.route('/configuracoes', function(){
	this.render('configuracoes');
},{
  name: 'configuracoes.index'
});



//
//  Ver meu perfil
//
Router.route('/user', function(){
	this.render('user');
},{
	name: 'user.index',
});

//
//  Ver meu perfil
//
Router.route('/user-edit', function(){
	this.render('editarPerfil');
},{
	name: 'user.edit',
});




//
// Ver meus perfis (facebook, insta, etc.)
//
Router.route('/user/perfis', function(){
	this.render('userPerfis', {
		data: function(){
			return Meteor.users.findOne({_id: this.params.userId}) || Meteor.user();
		}
	});
},{
	name: 'user.perfis',
});

//
// Ver minhas fotos privadas
//
Router.route('/user/fotos', function(){
	this.render('userFotos', {
		data: function(){
			return Fotos.findOne({_id: this.params.fotoId});
		}
	});
},{
	name: 'user.fotos',
});


Router.route('/fotos-publicas', function(){
	this.render('fotosPublicas', {
		data: function(){
			return Fotos.findOne({_id: this.params.fotoId});
		}
	});
},{
	name: 'fotos.publicas',
});
