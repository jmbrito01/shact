const FOTO_WIDTH = 500;
const FOTO_HEIGHT = 500;
const FOTO_QUALITY = 100;
Template._usersCadastrarFotos.events({
    'click #cadastrar-foto': function(){
        Session.set('mostrarAcoes',false);
        MeteoricCamera.getPicture({width:FOTO_WIDTH,height:FOTO_HEIGHT,quality:FOTO_QUALITY}, function(error,data){
            if (data && !error){
                Cloudinary._upload_file (data, {}, function(error, res){
                    if (res && !error){
                        Meteor.call('cadastrarFoto',res.public_id,res.secure_url);
                    }
                });  
            }
        });
    },    
});
