Meteor.methods({

	'atribuirTag': function(tagId, userId){
		check(tagId, String);
		check(userId, String)
		var tag = Tags.findOne({_id: tagId});
		try{
			if (Meteor.isServer){
				if (tag.tempTagId){
					var skyTagId = shactRecognition.salvarTagSync(userId, tag.tempTagId);	
					shactRecognition.treinarUserSync(userId);
				}
			}

			Tags.update({_id: tagId}, {$set:{
				userId: userId,
				porId: Meteor.userId(),
				tagId: skyTagId
			}});	

			Meteor.call('adicionarParticipante', tag.fotoId, userId, 'reconhecimento');

			return true;				
		}catch (e){
			console.log(e);
			throw new Meteor.Error(e);
		}
	},
	'desatribuirTag': function(tagId){
		//segurança!!!

		if (Meteor.isServer){
			var tag = Tags.findOne({_id: tagId});
			if (tag){
				try{
					if (tag.tagId){
						var res = shactRecognition.removerTagSync(tag.tagId);
						shactRecognition.treinarUserSync(tag.userId);
					}

					Tags.update({_id: tagId}, {$unset: {userId:"", porId: "", tempTagId: "", tagId: ""}})
				}catch(e){
					console.log(e);
					throw new Meteor.Error(e.toString());
				}			
			}
		}
	}
})