const ERRO_NENHUMA_FOTO = 300;
const ERRO_NENHUMA_TAG = 301;
const ERRO_NENHUMA_TAG_SALVA = 302;
const ERRO_NENHUMA_TAG_REMOVIDA = 303;
const ERRO_TREINAMENTO = 304;

var namespace = Meteor.settings.SkyBiometryNamespace;
if(!namespace) {
  throw new Error("SkyBiometryNamespace is required!");
}


ErroReconhecimento = function(code, msg){
	this.code = code;
	this.msg = msg;
}

ErroReconhecimento.prototype.toString = function(){
	return "[" + this.code +"] " + this.msg;
}
ShactRecognition = function(){
	this.sync = {
		faces: Async.wrap(this.faces,_.keys(this.faces)),
		tags: Async.wrap(this.tags,_.keys(this.tags)),
		account: Async.wrap(this.account,_.keys(this.account)),
	}
}

ShactRecognition.prototype = new SkyBiometry(Meteor.settings.SkyBiometryAPIKey, Meteor.settings.SkyBiometryAPISecret, namespace);


ShactRecognition.prototype.detectarFaceSync = function(url){
	console.log("detectando face...");
	var res = this.sync.faces.detect(url, {detector:'aggressive',attributes:'none'});

	if (!res.photos.length)
		throw new ErroReconhecimento(ERRO_NENHUMA_FOTO, "Nenhuma foto chegou ao servidor de reconhecimento.");

	var photo = res.photos[0];
	
	if (!photo.tags.length)
		throw new ErroReconhecimento(ERRO_NENHUMA_TAG, "Nenhum rosto foi reconhecido na foto.");

	var tag = photo.tags[0];


	return {
		tempTagId: tag.tid,
		posicao: tag.center,
		dimensoes:{
			width:tag.width,
			height:tag.height
		}
	}		
}

ShactRecognition.prototype.reconhecerFacesSync = function(userIds, url){

	var self = this;

	var uids = _.map(userIds,function(uid){
		return self.constroiNamespace(uid);
	}).join(',');

	console.log("reconhecendo faces... uids->", uids);

	var res = this.sync.faces.recognize(uids, url, {});

	
	var tags = _.map(res.photos[0].tags,function(tag){
		var candidatos = _.map(tag.uids, function(uid){
			return {
				userId: self.pegaUserId(uid.uid),
				certeza: uid.confidence
			}
		});

		return {
			tempTagId: tag.tid,
			posicao: tag.center,
			dimensoes:{
				width: tag.width,
				height: tag.height
			},
			candidatos: candidatos
		}
	})

	return tags;
}

ShactRecognition.prototype.salvarTagSync = function(userId,tagId){
	console.log("salvando tag...");
	var namespace = this.constroiNamespace(userId);

	var res = this.sync.tags.save(namespace, tagId, {});
	
	if (!res.saved_tags.length)
		throw new ErroReconhecimento(ERRO_NENHUMA_TAG_SALVA, "Nenhuma tag foi salva no processo.");
	

	return res.saved_tags[0].tid;
}

ShactRecognition.prototype.treinarUserSync = function(userId){
	console.log("treinando user...");
	var namespace = this.constroiNamespace(userId);
	var res = this.sync.faces.train(namespace, {});
	

	return (res.status=="success")?true:false;
}
ShactRecognition.prototype.removerTagSync = function(tagId){
	console.log("removendo tag...");
	var res = this.sync.tags.remove(tagId, {});

	if (!res.removed_tags.length)
		throw new ErroReconhecimento(ERRO_NENHUMA_TAG_REMOVIDA, "Nenhuma tag foi removida no processo.");

	return res.removed_tags[0].tid;
}


ShactRecognition.prototype.detectarFace = function(url,callback){
	this.faces.detect(url,{detector:'aggressive',attributes:'none'}, function(err,res){
		if (!err){
			if (!res.photos.length){
				err = new ErroReconhecimento(ERRO_NENHUMA_FOTO, "Nenhuma foto chegou ao servidor de reconhecimento.");
			}else{
				var photo = res.photos[0];	
				if (!photo.tags.length){
					err = new ErroReconhecimento(ERRO_NENHUMA_TAG, "Nenhum rosto foi reconhecido na foto.")
				}else{
					var tag = photo.tags[0];	
					callback(null, {
						tempTagId: tag.tid
						//retornar dimensoes!
					});
					return;
				}

			}			
		}
		callback(err, null);
	})
}



ShactRecognition.prototype.salvarTag = function(userId, tagId ,callback){
	var namespace = this.constroiNamespace(userId);
	this.tags.save(namespace,tagId, {}, function (err,res){
		if (!err){
			if (!res.saved_tags.length){
				err = new ErroReconhecimento(ERRO_NENHUMA_TAG_SALVA, "Nenhuma tag foi salva no processo.");
			}else{
				callback(null, res.saved_tags[0].tid);
				return;		
			}
		}

		callback(err, null);
	})
}

ShactRecognition.prototype.removerTag = function(tagId, callback){
	var res = this.sync.tags.remove(tagId, {});
	this.tags.remove(tagId,{}, function (err,res){
		if (!err){
			if (!res.removed_tag){
				err = new ErroReconhecimento(ERRO_NENHUMA_TAG_REMOVIDA, "Nenhuma tag foi removida no processo.");
			}else{
				callback(null, res.removed_tag.tid);
				return;
			}			
		}

		callback(err, null);
	})
}




shactRecognition = new ShactRecognition();