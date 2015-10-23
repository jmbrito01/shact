Template.conexoesAceitar.helpers({
	conexao:function(){
		console.log(Template.instance().conexaoId);
		return Conexoes.findOne({_id: Template.instance().conexaoId});
	}
})

Template.conexoesAceitar.onCreated(function(){
	this.conexaoId = this.data.id;
})
Template.conexoesAceitar.events({
	'click #aceitar':function(e, tmpl){
		var conexaoId = tmpl.conexaoId;
		var perfis = perfisSelecionados.valoresVerdadeiros();
		console.log(conexaoId);
		Conexoes.update({_id:conexaoId},{$set:{status:CONEXAO_ACEITA}, $addToSet:{perfis:{$each:perfis}}})
		IonModal.close();
	}
})