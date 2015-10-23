Template.albumThumbs.helpers({
    isAvatar:function(){
        return (Meteor.user().profile.avatar==this._id);
    },
    foto: function(){
        return Fotos.findOne({_id: this.fotoId});
    },    
})
