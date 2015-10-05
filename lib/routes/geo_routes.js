var geoRoutes = FlowRouter.group({
  prefix: '/geo',
});

geoRoutes.route('/busca', {
  name: 'geo.busca',
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'geoBusca',botaoEsquerda: '_voltar'});
  },
});
