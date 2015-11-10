var esUrl = Meteor.settings.ES_URL;
if(!esUrl) {
  throw new Error("ES_URL is required!");
}

var elasticsearch = Meteor.npmRequire('elasticsearch');
var client = new elasticsearch.Client({
  host: esUrl
});


ElasticSearch = function(index, type){
  this.index = index;
  this.type = type;
  this.EsClient = Async.wrap(client, ['index', 'search','update','delete']);

}

ElasticSearch.prototype.registrarUsuario = function(id, nome){
  var esDoc = {
    _id: id,
    name: nome,
  }

  console.log(esDoc);
  
  return this.EsClient.index({
    index: this.index,
    type: this.type,
    id: id,
    body: esDoc    
  })  
}

ElasticSearch.prototype.removerUsuario = function(id){
  return this.EsClient.delete({
    index: this.index,
    type: this.type,
    id: id
  });  
}

ElasticSearch.prototype.setLocalizacao = function(id, localizacao){
  console.log("Setting location for ",id);

  console.log(localizacao);
  
  var esDoc = {
    location: {
      lat: parseFloat(localizacao.latitude),
      lon: parseFloat(localizacao.longitude)
    }
  }

  console.log(esDoc);

  return this.EsClient.update({
    index:this.index,
    type:this.type,
    id: id,
    body:{
      doc: esDoc
    }
  });  
}

ElasticSearch.prototype.usuariosProximos = function(localizacao, raio, excluir, textoBusca){
    textoBusca = textoBusca.toLowerCase();
    var palavras = textoBusca.trim().split(" ");
    var ultimaPalavra = palavras[palavras.length -1];   
    var latitude = localizacao.latitude;
    var longitude = localizacao.longitude;

    console.log(localizacao);
    console.log(raio);
    console.log(excluir);
    console.log(textoBusca);

  


    var query = {
      "filtered" : {
        "filter":{
          "and":[
            {
            "geo_distance" : {
                "distance" : raio + "m",
                "location" : {"lat" : latitude,"lon" : longitude}
              }
            },
            {
              "bool" : {
                "must_not" : {"terms" : {"_id" :excluir} }
              }
            }              
          ]
       },
       "query" : {
        'bool': {
          "should": [
            {"match": {"name": {"query": textoBusca,"fuzziness": 2}}},
            {"prefix": {"name": ultimaPalavra}}]
          }
        }          
      }
    };

    var sort = {
      "_geo_distance" : {
        "location" : {
          "lat" : latitude,
          "lon" : longitude
        }, 
        "order" : "asc",
        "unit" : "m",
        "distance_type": "plane"
      }
    }

    var resposta = this.EsClient.search({
      index: "shact",
      type: "shacters",
      body: {
        query: query,
        sort: sort
      }
    });

    

    var resultados = _.map(resposta.hits.hits,function(resultado){
      var source = _.clone(resultado._source);
      source._score = resultado._score;
      source.distance = resultado.sort[0];

      var user = Meteor.users.findOne({_id: source._id});
      if (user){
          //console.log(user);

          if (user.profile.avatar){
            var fotoId = user.profile.avatar;
            var foto = Fotos.findOne({_id: fotoId});
            if (foto){
              source.publicId = foto.imagem.publicId;
            }
          }
      }

      return source;
    });

    return {
        resultados: resultados,
        total: resposta.hits.total,
        tempo: resposta.took
    }

}

elasticSearch = new ElasticSearch('shact','shacters');

SearchSource.defineSource('shacters', function(textoBusca, opcoes) {
  Meteor._sleepForMs(1000);
  
  if (!Meteor.user()){
    throw new Meteor.Error('Não está logado');
    return;
  }

  if (!Meteor.user().localizacao){
    throw new Meteor.Error ('Não tem coordenadas GPS');
    return;
  }



  var raio = parseFloat(opcoes.raio);
  var localizacao = Meteor.user().localizacao;


  /*
  var conexoes = Conexoes.find({userIds: Meteor.userId()}).fetch();
  conexoesIds =_.map(conexoes,function(conexao){
    return conexao.outroUsuario()._id;
  })
  var excluirIds = _.union([Meteor.userId()], conexoesIds);
  */

  var user = Meteor.user();

  var contatos = user.contatos || [];
  var pendings = user.pendings || [];
  var recentes = user.recentes || [];

  var excluirIds = _.union(Meteor.userId(), contatos, pendings, recentes);
  var busca = elasticSearch.usuariosProximos(localizacao,raio, excluirIds,textoBusca);

  // getting the metadata
  var metadata = {
    total: busca.total,
    tempo: busca.tempo
  };

//console.log(busca.resultados);
  
  return {
    data: busca.resultados,
    metadata: metadata
  };
});

