Template.conexoesView.helpers({
	compartilharMais:function(){
		return Session.get('compartilharMais');
	}
})

var atualizarPerfis = function(c){
	var uA = ultimaAcao.get();

	
	var conexaoId = Template.instance().data._id;


	console.log(conexaoId);
	console.log(uA);
	if (uA.action=='remove'){
		console.log("REMOVE!");
		Conexoes.update({_id: conexaoId},{$pull:{perfis: uA._id}});
	}else if (uA.action=='push'){
		console.log("PUSH!");
		Conexoes.update({_id: conexaoId},{$addToSet:{perfis: uA._id}});
	}

	/*
	console.log(c);
	var p = perfisSelecionados.get();
	if (c.firstRun) return;
	
	var conexaoId = Template.currentData()._id;
	var conexao = {};

	Tracker.nonreactive(function() {
		conexao = Conexoes.findOne({_id: conexaoId});
	});
	var meusPerfis = _.pluck(conexao.meusPerfis().fetch(),'_id');
	if (meusPerfis.length > p.length){ //removi um perfil

		var perfilRemovido = _.difference(meusPerfis,p);
		console.log("removi!", perfilRemovido);
		
	}else if (meusPerfis.length < p.length) { //adicionei um perfil
		var perfilAdicionado = _.difference(p, meusPerfis);
		console.log("adicionei!", perfilAdicionado);
		
	} 	

	console.log(p);
	console.log(conexao.perfis);
	*/
}


Template.conexoesView.events({
	'click #compartilhar-mais':function(e,tmpl){
		var conexaoId = tmpl.data._id;
		var conexao = Conexoes.findOne({_id: conexaoId});
		perfisSelecionados.set(_.pluck(conexao.meusPerfis().fetch(),'_id'));
		Session.set('compartilharMais',!Session.get('compartilharMais'));
	}
})
Template.conexoesView.onCreated(function(){
	Session.set('compartilharMais', false);
	this.autorun(atualizarPerfis);
})