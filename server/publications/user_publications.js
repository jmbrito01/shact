Meteor.publish(null, function() {
	return Meteor.users.find({}, {fields: {localizacao:1,services:1}});
});
