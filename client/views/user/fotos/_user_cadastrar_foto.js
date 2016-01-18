const FOTO_WIDTH = 500;
const FOTO_HEIGHT = 500;
const FOTO_QUALITY = 100;

Template.usersCadastrarFotos.events({
    'click #cadastrar-foto': function(){
        MeteoricCamera.getPicture({quality:FOTO_QUALITY}, function(error,data){
            if (data && !error){
                IonLoading.show({
                    backdrop: true
                });
                Cloudinary._upload_file (data, {}, function(error, res){
                    if (res && !error){
                        Meteor.call('cadastrarFoto',res.public_id,res.secure_url, TIPO_PRIVADO, function(error,res){
                            if (res && !error){
                                IonLoading.hide();
                                sAlert.success("Upload da foto concluído!");
                                Meteor.call('detectarFace', res, function(error,res){
                                    if (!error){
                                        sAlert.success("Rosto identificado com sucesso!");
                                    }else{
                                        return sAlert.error(error.error);;
                                    }
                                });
                            }else{
                                return sAlert.error(error.error);;                                
                            }
                        });
                    }else{
                        return sAlert.error("Erro fazendo upload.");
                    }
                });  
            }else{
                if (error!='cancel') return sAlert.error("Erro pegando foto da camera.");
            }
        });
    },    
});
