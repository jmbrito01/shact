Meteor.publish(null, function() {
	return Meteor.users.find({}, {fields: {
		localizacao:1,
		services:1,
		emails:1, 
		contatos:1,
		pendings: 1,
		recentes: 1
	}});
});
