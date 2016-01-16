Template.fotoPublicaDetails.events({
	'click .remover-tag': function(e, tmpl){
		var tagId = this._id;

	    IonPopup.confirm({
	      title: 'Remover tag',
	      template: 'Tem certeza?',
	      onOk: function() {
	      	var tag = Tags.findOne(tagId);
	      	Meteor.call('desatribuirTag', tagId);

	      },
	    });		
	},
	'click .user-add':function (){
		tentarConexao(this._id);
	}
})