Schemas = {};

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

Schemas.Imagem = new SimpleSchema({
    url:{
        type:String
    },
    publicId:{
        type:String
    },    
})

/*
Schema.FacePPFaces = new SimpleSchema({
    faceId: {
        type: String
    },
    imagem: {
        type: Schemas.Imagem
    }
})


Schemas.FacePP = new SimpleSchema({
    personId: {
        type: String
    },
    faces:{
        type:[Schema.FacePPFaces],
        optional:true,
        blackbox:true
    },
    group:{
        type: Object,
        blackbox:true,
        optional:true
    },
    "group.current":{
        type:String
    },
    "group.ready": {
        type:Boolean
    }
})
*/


Schemas.UserProfile = new SimpleSchema({
    nome: {
        type: String,
    },
    sobrenome: {
        type: String,
    },
    nomeCompleto: {
        type: String,
        autoValue: function(){
            var nome = this.field("profile.nome")
            var sobrenome = this.field("profile.sobrenome")
            if (nome.isSet && sobrenome.isSet){
             return nome.value + " " + sobrenome.value;
            }
        },
        autoform:{
            omit: true
        },
    },
    nascimento: {
        type: String,
        optional:true
    },
    genero: {
        type: String,
        allowedValues: ['male', 'female'],
    },
    celular:{
        type: String
    },
    avatar:{
        type:Schemas.Imagem,
        optional:true,
        blackbox:true,
        autoform:{
            omit:true
        }
    },    
    cover: {
        type: Schemas.Imagem,
        optional:true,
        autoform:{
            omit:true
        }
    },
    localizacao:{
        blackbox: true,
        optional:true,
        type: Schemas.Coordenadas,
        autoform:{
            omit:true
        }        
    }      
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },  
    profile: {
        type: Schemas.UserProfile,
    }, 
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    localizacao:{
        type: Schemas.Coordenadas,
        optional:true,
        blackbox:true
    },
    status:{
      type:Object,
      blackbox:true,
      optional:true
    }       
});

Meteor.users.helpers({
    /*
  avatar: function() {
    if (this.profile.avatar.publicId){
        //c.url (avatar.publicId,{format='png' gravity='faces' mode='thumb' crop='thumb' height=100 width=100;
        return $.cloudinary.url(this.profile.avatar.publicId,{format:'png',gravity:'faces',mode:'thumb',crop:'thumb',height:100,width:100});
    }else{
        return 'unknown.jpeg';
    }
  }
  */
});

Meteor.users.attachSchema(Schemas.User);
Meteor.users.attachBehaviour('timestampable');


if (Meteor.isServer){
    Meteor.users.before.insert(function(userId,doc){
        elasticSearch.registrarUsuario(doc._id, doc.profile.nomeCompleto);
    });    

    Meteor.users.after.remove(function(userId,doc){
        console.log(elasticSearch.removerUsuario(doc._id));
    })
}

/*

if (Meteor.isServer){
    Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options){
        if (modifier.$set["profile.localizacao"] || modifier.$set["profile.localizacao.latitude"] || modifier.$set["profile.localizacao.longitude"]){
            try{
                var response = setShacterLocation(doc._id,doc.profile.location);
                console.log("Sucess setting Shacter location");
            } catch(e){
                console.log("Error setting Shacter location",e);
            }
        }

        if (modifier.$set['profile.avatar']){
            console.log(doc.profile.avatar.url);
            try{
                
                var response= detectionDetect(doc.profile.avatar.url,'oneface');
                var face = response.face;
                
               if (face.length){
                    try{
                        var response = personAddFace(doc._id, face[0].face_id)
                        console.log("Success adding face to person", face[0].face_id);
                    }catch(e){
                        console.log ("Error adding face to person",e);
                    }
                }else{
                    console.log("No faces detected :(");
                }
            }catch(e){
                console.log("Error detecting Faces",e);
            }

        }
    });

    Meteor.users.before.insert(function(userId,doc){
        //Regiter SHACTER on ELASTIC SEARCH
        try{
            var response = addShacter(doc);
            console.log("Success Registering Shacter");
        } catch(e){
            console.log("Error adding shacter",e);
        }
        //Register PERSON on FACE++
        try{
            var response = personCreate(doc._id);
            console.log("Success Registering Person");
            var facePPDoc = {
                personId: response.person_id,
                group:{
                    current: "",
                    ready: false
                }
            }        
            doc.profile.facePP = facePPDoc;            
        }catch(e){
            console.log("Error adding person",e);
        }

    });

    Meteor.users.after.remove(function(userId,doc){
        //Delete SHACTER from ELASTIC SEARCH
        try{
            var response = removeShacter(doc)
            console.log('Success deleting Shacter');
        }catch(e){
            console.log("Error deleting shacter",e);
        }
        //Delete PERSON from FACE++
        try{
            var response = personDelete(doc._id);
            console.log("Success deleting Person from FACE++");
        }catch(e){
            console.log("ERROR",e);
        }        
    });    
}
*/