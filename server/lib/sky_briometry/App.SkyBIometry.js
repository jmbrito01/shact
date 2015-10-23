requiredParamsError = function(missing){
	this.missing = missing;
}

requiredParamsError.prototype.toString = function(){
	return this.missing.join(',');
}

SkyBiometry = function(apiKey,apiSecret, namespace){
	this.apiKey = apiKey;
	this.apiSecret = apiSecret;
	this.baseUrl = "http://api.skybiometry.com/fc";
	this.namespace = namespace;
	var self = this;

	this.faces = {
		detect: function(urls, options,callback){
			options = _.extend(options,{
				urls: urls
			})

			self.makeRequest('GET','/faces/detect', options, callback);
		},		
		recognize: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/recognize', options, callback);
		},

		/*
		Method can be used to detect, group and optionally recognize one or more user faces in one or more photos. 
		faces/group method tries to match all the faces that were found in the images specified by urls or through POST one to other, 
		then assigns a group ID for all detected faces that appear to be of the same person. If user ids are specified when 
		calling this methods, method also attempts to assign the most likely user id for each detected face/group of faces. 
		Returned result are similar to faces/recognize method results.
		*/
		group: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/group', options, callback);
		},
		train: function(uids, options, callback){
			options = _.extend(options,{
				uids: uids
			})

			self.makeRequest('GET','/faces/train', options, callback);
		},	
		status: function(uids, options,callback){
			options = _.extend(options,{
				uids: uids
			})

			self.makeRequest('GET','/faces/status', options, callback);
		},			
	}

	this.tags = {
		/*Tags/get method allows to get already saved tags to data namespace.
		By specifying different parameters and criteria you can influence the returned tags.
		*/
		get: function(uids, pids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids,
				pids: pids
			})

			self.makeRequest('GET','/tags/get', options, callback);
		},	
		add: function(url,x, y, width, height, uid, options,callback){
			options = _.extend(options,{
				x:x,
				y:y,
				width:width,
				height:height,
				uid: uid
			})

			self.makeRequest('GET','/tags/add', options, callback);
		},	
		save: function(uid, tids, options,callback){
			options = _.extend(options,{
				uid: uid,
				tids: tids
			})

			self.makeRequest('GET','/tags/save', options, callback);
		},			
		remove: function(tids, options,callback){
			options = _.extend(options,{
				tids: tids,
			})

			self.makeRequest('GET','/tags/remove', options, callback);
		},			
	}


	this.account = {
		recognize: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/regonize', options, callback);
		},
		limits: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/regonize', options, callback);
		},
		namespaces: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/regonize', options, callback);
		},
		users: function(uids, urls, options,callback){
			options = _.extend(options,{
				urls: urls,
				uids: uids
			})

			self.makeRequest('GET','/faces/regonize', options, callback);
		},								
	}
}

SkyBiometry.prototype.makeRequest = function(method, path, params, callback){
	params = _.extend(params,{
		api_key: this.apiKey,
		api_secret: this.apiSecret
	});

	HTTP.call(method, this.baseUrl + path,{params: params}, function(error, response){
		if (typeof callback == 'function')
			callback(error,JSON.parse(response.content));
	})
}
SkyBiometry.prototype.constroiNamespace = function(userId){
	return userId + "@" + this.namespace;
}


SkyBiometry.prototype.checkParams = function(model, params){
	var keys = _.keys(params);
	if (_.intersection(model,keys).length < model.length) throw new requiredParamsError(_.difference(model, keys));
	///return _.difference(model,keys);
	//[a,b,c]   [a,b]
	//-> [c]
	//[a,b]  [a,b,c]
	//-> []
}

SkyBiometry.prototype.pegaUserId = function(namespace){
	return namespace.substr(0, namespace.indexOf('@')); 	
}