
Template.conexoesView.helpers({
	compartilharMais:function(){
		return Session.get('compartilharMais');
	},
	queryHelper: function(){
		console.log('com=' + this._id)
		return 'com=' + this._id;
	}
})

var atualizarPerfis = function(c){
	var uA = ultimaAcao.get();	
	console.log(uA);
	var conexaoId = Template.instance().data._id;

	if (uA.action=='remove'){
		Conexoes.update({_id: conexaoId},{$pull:{perfis: uA._id}});
	}else if (uA.action=='push'){
		Conexoes.update({_id: conexaoId},{$addToSet:{perfis: uA._id}});
	}
	//ultimaAcao.set({});
}

Template.ionNavBar.events({
	'click #compartilhar-mais':function(){
		var conexaoId = Router.current().params.conexaoId;
		var conexao = Conexoes.findOne({_id: conexaoId});
		perfisSelecionados.set(_.pluck(conexao.meusPerfis().fetch(),'_id'));
		Session.set('compartilharMais',!Session.get('compartilharMais'));
	}
})

Template.conexoesView.onCreated(function(){
	Session.set('compartilharMais', false);
	this.autorun(atualizarPerfis);
})
