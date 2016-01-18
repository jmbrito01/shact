Template.podium.helpers({
  user: function() {
    return Meteor.users.findOne({
      _id: this.userId
    });
  },
  pendente: function() {
    return (this.status === 0);
  },
  amigos: function() {
    return (this.status === 1);
  },
  colored: function(n) {
    if (n >= 0 && n < 30) {
      return 'text-red';
    } else if (n >= 30 && n < 70) {
      return 'text-yellow';
    } else if (n >= 70 && n < 100) {
      return 'text-green';
    }
  }
})

Template.podium.events({
  'click .marcar-user': function() {

    IonPopup.confirm({
      title: 'Marcar usuário',
      template: 'Quer marcar <b>' + this.profile.nomeCompleto + '</b> neste rosto?',
      onOk: () => {
        var tagId = Session.get('tagSelecionada');
        Meteor.call('atribuirTag', tagId, this._id, function(err, res) {
          if (!err && res) {
            console.log("SUCESSO!");
          }
        });
      },
    });
  }
})
