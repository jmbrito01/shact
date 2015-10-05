var selfieRoutes = FlowRouter.group({
  prefix: '/selfie',
});

selfieRoutes.route('/busca', {
  name: 'selfie.busca',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'selfieBusca'});
  },
});
