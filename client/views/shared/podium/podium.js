Template.podium.helpers({
    user: function(){
        return Meteor.users.findOne({_id: this.userId});
    }
})