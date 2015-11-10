if (Meteor.isServer){
	Meteor.methods({
		adicionarParticipante: function(fotoId, userId, metodo){
			Fotos.update({_id: fotoId}, {$push:{
				participantes:{
					userId: userId,
					porId: Meteor.userId(),
					metodo: metodo				
				}
			}});
		},
		//
		//  Detectar face em uma FOTO PRIVADA, pego tag e já salvo no user
		// 
		detectarFace: function(fotoId){
			check(fotoId, String);
			var foto = Fotos.findOne({_id: fotoId});

			//só pode ser aplicado em fotos tipo privada
			if (foto.tipo!=TIPO_PRIVADO) throw new Meteor.Error("A foto é pública.");

			try{
				//detectar face na foto
				var res = shactRecognition.detectarFaceSync(foto.imagem.url);  
				console.log("face detectada!");					
				//salvar tag no usuario
				var tagId = shactRecognition.salvarTagSync(foto.userId, res.tempTagId);
				console.log("tag salva!");
				//colocar essa tag no meu banco de dados
				Tags.insert({
					userId: Meteor.userId(),
					fotoId: foto._id,
					tagId: tagId,
					posicao: res.posicao,
					dimensoes: res.dimensoes,
					tipo: TIPO_PRIVADO
				})
				//treinar usuario
				var res = shactRecognition.treinarUserSync(Meteor.userId());
				console.log("usuario treinado!");
				//colocar status da foto como pronto
				Fotos.update({_id: foto._id}, {$set: {'reconhecimento.status': STATUS_RECONHECIDO}});	
				return true;
			}catch(e){
				//deu erro
				console.log("error: ", e.toString());
				Fotos.update({_id: foto._id}, {$set: {'reconhecimento.status': STATUS_ERRO}});	
				throw new Meteor.Error(e.code, e.msg);
			}
		},
		//
		//   Reconhecer faces em uma FOTO PUBLICA, para cada rosto salvo candidatos em Tags (tag temporária)
		//
		reconhecerFaces: function(fotoId){
			check(fotoId, String);
			var foto = Fotos.findOne({_id: fotoId});
			//só pode ser aplicada em fotos tipo publico
			if (foto.tipo!=TIPO_PUBLICO) throw new Meteor.Error("A foto é privada.");

			try{
				//reconhece faces na foto contra usuários proximos guardados na foto
				var tags = shactRecognition.reconhecerFacesSync(_.pluck(foto.usersProximos,'userId'), foto.imagem.url);
				console.log("faces reconhecidas!");

				//pra cada face, salva a tag no meu banco de dados (já com candidatos)
				//tenho tagTempId, não tagId
				_.each(tags,function(tag){
					tag = _.extend(tag,{
						fotoId: fotoId,
						tipo: TIPO_PUBLICO,
					})
					Tags.insert(tag);
				});

				return true;
			}catch(e){
				console.log("error:", e.toString());
				throw new Meteor.Error(e.code, e.msg);
			}
		},
		//
		//	Remover foto, se a foto era a do perfil do cara, pega proxima foto ou seta pra vazio
		//
		removerFoto:function(fotoId){
			check(fotoId, String);
			Fotos.remove({_id: fotoId});

			//se a foto removida era a de perfil
			if (Meteor.user().profile.avatar==fotoId){
				//encontro proxima foto nas fotos cadastradasd o cara
				var proxFoto = Fotos.findOne({userId: Meteor.userId(), tipo:TIPO_PRIVADO});
				//se encontrou alguma foto, seta de perfil. se não encontrou, coloca nada no perfil
				var novoAvatar = (proxFoto) ?  proxFoto._id : '';
				Meteor.call('setAvatar', novoAvatar);
			}
		},	
		//
		//	Cadastrar uma foto (PUBLICA ou PRIVADA), se for publica, devo pegar localizacao e usuarios próximos
		//	
		cadastrarFoto:function(publicId, url, tipo){
			check (publicId, String);
			check (url, String);

			var imagemDoc = {
				publicId: publicId,
				url:url
			}

			var fotoDoc = {
				imagem:imagemDoc,
				userId: Meteor.userId(),
				participantes: [{
					userId: Meteor.userId(),
					metodo: METODO_FOTOGRAFO
				}],
				tipo: tipo,
				reconhecimento:{
					status: STATUS_RECONHECENDO
				}
			}

			var localizacao = Meteor.user().localizacao || {};

			//se é uma foto publica, tenho a localizacao do usuario e estou no server
			if (tipo==TIPO_PUBLICO && localizacao && Meteor.isServer){
				//pegar usuarios proximos no elastic search
				var es = elasticSearch.usuariosProximos(localizacao, FOTO_RAIO_PROXIMIDADE, [], '');  
				
				//mapeia resultado do elastic search para meu banco de dados	
				var usersProximos = _.map(es.resultados,function(resultado){
					return {
						userId: resultado._id,
						distancia: resultado.distance
					}
				});

				//preciso guardar localizacao e usuarios proximos
				

				_.extend(fotoDoc,{
					usersProximos: usersProximos,
					localizacao:localizacao
				})            
			}else if (tipo==TIPO_PUBLICO && !localizacao){
				throw new Meteor.Error('Foto pública sem localização');
			}
			return Fotos.insert(fotoDoc);
		},			
	});
}