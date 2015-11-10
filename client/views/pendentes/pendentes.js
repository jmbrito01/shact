Template.pendentes.helpers({
	pendentes: function(){
		if (!Meteor.user().pendentes) return [];
		return Meteor.users.find({_id: {$in: Meteor.user().pendentes}});
	},
	getConexao: function(){
		var conexao = Conexoes.findOne({
			userIds:{$all:[this._id, Meteor.userId()]},
			status: CONEXAO_PENDENTE
		},{fields:{
			_id: 1
		}});
		return conexao && conexao._id;
	}
})