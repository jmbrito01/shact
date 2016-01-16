var buildRegex = function(searchText) {
  if (!searchText) return new RegExp("");
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(^" + parts.join('.*(.* )* ') + ")", "i")
}

Template.contatos.helpers({
  contatos: function() {
    var textoBusca = Session.get('textoBuscaContatos');

    if (!Meteor.user().contatos) return [];

    return Meteor.users.find({
      _id: {
        $in: Meteor.user().contatos
      },
      'profile.nomeCompleto': {
        $regex: buildRegex(textoBusca)
      }
    },{
    	sort: {
    		'profile.nomeCompleto': 1
    	}
    })
  },
  getConexao: function() {
    var conexao = Conexoes.findOne({
      userIds: {
        $all: [this._id, Meteor.userId()]
      },
      status: CONEXAO_ACEITA
    }, {
      fields: {
        _id: 1
      }
    });


    return conexao && conexao._id;
  }
})

Template.contatos.onRendered(function() {
  Session.setDefault('textoBuscaContatos', '');
  this.$('#texto-busca-contatos').val(Session.get('textoBuscaContatos'));
})

Template.contatos.events({
  'keyup #texto-busca-contatos': function(e) {
    var el = $(e.target);
    Session.set('textoBuscaContatos', el.val());
  }
})
