var usersRoutes = FlowRouter.group({
  prefix: '/users',
});

usersRoutes.route('/', {
  title: "Usuários",
  name: 'users.index',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'users'});
  },
});

usersRoutes.route('/add', {
  title: "Adicionar",
  parent:"users.index",     
  name: 'users.add',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'usersAdd'});
  },
});

usersRoutes.route('/:id/view', {
  title: "Usuário",
  name: 'users.view',
  title: function(){return Meteor.users.findOne({_id:FlowRouter.getParam('id')}).nome();},
  parent:"users.index",      
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'usersView'});
  },
});

usersRoutes.route('/:id/edit', {
  title: "Editar",
  parent:"users.view",     
  name: 'users.edit',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'usersEdit'});
  },
});

