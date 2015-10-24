Template.userFotosThumb.helpers({
    isAvatar:function(){
        return (Meteor.user().profile.avatar==this._id);
    }
})
