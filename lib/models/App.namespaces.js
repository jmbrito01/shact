Schemas = {};

Schemas.Imagem = new SimpleSchema({
    url:{
        type:String
    },
    publicId:{
        type:String
    },    
});


Schemas.Coordenadas = new SimpleSchema({
    latitude: {
        type: Number,
        decimal: true
    },
    longitude:  {
        type: Number,
        decimal: true
    }
});