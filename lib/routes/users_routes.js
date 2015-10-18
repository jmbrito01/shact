/*
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

usersRoutes.route('/:userId/view', {
  title: "Usuário",
  name: 'users.view',
  //title: function(){return Meteor.users.findOne({_id:FlowRouter.getParam('id')}).nome();},
  //triggersEnter:[function(){
    //if (!FlowRouter.getParam('userId')) FlowRouter.setQueryParam({userId})
  //}],
  parent:"users.index",      
  action: function() {
    var user = Meteor.users.findOne({_id:FlowRouter.getParam('userId')}) || Meteor.user();
    if (user){
      BlazeLayout.render('defaultLayout', {main: 'usersView', user: user});
    }
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

*/

