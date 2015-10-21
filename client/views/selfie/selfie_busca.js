const FOTO_WIDTH = 500;
const FOTO_HEIGHT = 500;
const FOTO_QUALITY = 100;
 
const STATUS_IDLE = 0; //esperando pra tirar foto
const STATUS_UPLOADING = 1;
const STATUS_RECONHECIMENTO = 2;
const STATUS_ERRO = 3;
const STATUS_SUCESSO = 4;

var status = new ReactiveVar(STATUS_IDLE);

Template.selfieBusca.onRendered(function(){
	Session.setDefault('fotoAtual', '');
})

Template.selfieBusca.helpers({
	fotoAtual: function(){
		return Session.get('fotoAtual');
	},
	statusItem: function(){
		var icone, texto, cor
		switch (status.get()){
			case STATUS_IDLE:
				icone = "fa fa-camera";
				texto = "Tire uma foto com seu novo amigo!";
			break;
			case STATUS_UPLOADING:
				icone = "fa fa-spinner fa-spin";
				texto = "Enviando foto para o servidor...";
			break;
			case STATUS_RECONHECIMENTO:
				icone = "fa fa-cog fa-spin";
				texto = "Reconhecendo faces...";
			break;
			case STATUS_ERRO:
				icone = "fa fa-times";
				texto = "Algum erro ocorreu!";
			break;
			case STATUS_SUCESSO:
				icone = "fa fa-check";
				texto = "Sucesso";
			break;									
		}

		return {
			icone:icone,
			texto:texto,
			cor: cor
		}
	}
})

Template.selfieBusca.events({
    'click #tirar-foto': function(){

        MeteoricCamera.getPicture({width:FOTO_WIDTH,height:FOTO_HEIGHT,quality:FOTO_QUALITY}, function(error,data){
            if (data && !error){
            	//Camera Ok
            	Session.set('fotoAtual',data);
            	status.set(STATUS_UPLOADING);
                Cloudinary._upload_file (data, {}, function(error, res){
                    if (res && !error){
                    	//Upload Ok
                    	status.set(STATUS_RECONHECIMENTO);

                    	Meteor.call('cadastrarFoto', res.public_id, res.secure_url, TIPO_PUBLICO,function(error,res){
                    		if (res && !error){
                    			Meteor.call('reconhecerFaces', res, function(err,res){
                    				status.set(STATUS_SUCESSO);
                    			});
                    		}else{
                    			return sAlert.error(error.error);
                    		}
                    	})
                    	/*
                        Meteor.call('cadastrarFoto',res.public_id,res.secure_url, TIPO_PRIVADO, function(error,res){
                            if (res && !error){
                                sAlert.success("Upload da foto concluído!");
                                Meteor.call('detectarFaces', res, function(error,res){
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
*/
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
