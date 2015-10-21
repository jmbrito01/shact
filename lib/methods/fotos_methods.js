if (Meteor.isServer){
	Meteor.methods({
		detectarFace: function(fotoId){
			this.unblock();
			var foto = Fotos.findOne({_id: fotoId});

			if (foto.tipo==TIPO_PUBLICO) throw new Meteor.Error("A foto é pública.");

			try{
				var res = shactRecognition.detectarFaceSync(foto.imagem.url);  
				console.log("face detectada!");					
				var tagId = shactRecognition.salvarTagSync(foto.userId, res.tempTagId);
				
				Tags.insert({
					userId: Meteor.userId(),
					fotoId: foto._id,
					tagId: tagId,
					posicao: res.posicao,
					dimensoes: res.dimensoes,
					tipo: TIPO_PRIVADO
				})
				console.log("tag salva!");  		

				var res = shactRecognition.treinarUserSync(Meteor.userId());
				console.log("usuario treinado!", Meteor.userId());

				Fotos.update({_id: foto._id}, {$set: {'reconhecimento.status': STATUS_RECONHECIDO}});	
				return true;
			}catch(e){
				console.log("error: ", e.toString());
				Fotos.update({_id: foto._id}, {$set: {'reconhecimento.status': STATUS_ERRO}});	
				throw new Meteor.Error(e.toString());
			}
		},
		reconhecerFaces: function(fotoId){
			this.unblock();
			var foto = Fotos.findOne({_id: fotoId});
			if (foto.tipo==TIPO_PRIVADO) throw new Meteor.Error("A foto é privada.");

			try{
				
				var res = shactRecognition.reconhecerFacesSync(_.pluck(foto.usersProximos,'userId'), foto.imagem.url);
				console.log("faces reconhecidas");

				return;
				_.each(res, function(tag){
					var candidatos = _.map(res.candidates,function(candidate){

					});

					Tags.insert({
						userId: null,
						fotoId: foto._id,
						tagId: tag,
						posicao: tag.posicao,
						dimensoes: tag.dimensoes,
						tipo: TIPO_PUBLICO,
						candidatos: candidatos
					})
				})
				console.log("tags temporárias salvas!");
				return true;
				//Fotos.update({_id: foto._id}, {$set: {'reconhecimento.status': STATUS_RECONHECIDO}});
			}catch(e){
				console.log("error:", e.toString());
				throw new Meteor.Error(e.toString());
			}
		}		
	});
}