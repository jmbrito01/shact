Meteor.publish(null, function() {
	return Meteor.users.find({}, {fields: {
		localizacao:1,
		services:1,
		emails:1, 
		contatos:1,
		pendentes: 1,
		recentes: 1,
		status: 1
	}});
});
