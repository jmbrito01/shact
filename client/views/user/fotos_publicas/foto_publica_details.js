Template.fotoPublicaDetails.events({
	'click .remover-tag': function(e, tmpl){
		var tagId = this._id;

	    IonPopup.confirm({
	      title: 'Remover tag',
	      template: 'Tem certeza?',
	      onOk: function() {
	      	Meteor.call('desatribuirTag', tagId);
	    	/*Tags.remove({_id: tagId});*/
	      },
	    });		
	},
	'click .user-add':function (){
		tentarConexao(this._id);
	}
})