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

Schemas.UserTags = new SimpleSchema({
    tagId: {
        type: String
    },
    fotoId:{
        type:String
    }
})

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
            var nome = this.field("profile.nome");
            var sobrenome = this.field("profile.sobrenome");
            //console.log("AQUI", nome, sobrenome);
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
    },
    genero: {
        type: String,
        allowedValues: ['male', 'female'],
        autoform:{
            type: "select",
            options:[
                {label:"Masculino", value:"male"},
                {label:"Feminino", value:"female"}
            ]
        }
    },
    celular:{
        type: String
    },
    avatar:{
        type:String
    },
    fotos:{
        type:[String],
        optional:true,
        defaultValue:[]
    },    
    cover: {
        type: Schemas.Imagem,
        autoform:{
            omit:true
        }
    },
    tags: {
        type: [Schemas.UserTags],
        autoform:{
            omit:true
        }
    }
});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        optional:true
    },
    emails: {
        type: [Object],
        optional: true,
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
    },
    "emails.$.verified": {
        type: Boolean
    },  
    profile: {
        type: Schemas.UserProfile,
        optional:true,
        blackbox:true
    }, 
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional:true,
        blackbox: true
    },
    localizacao:{
        type: Schemas.Coordenadas,
        optional:true,
    },
    status:{
      type:Object,
      optional:true,
      blackbox:true,
    },
      registered_emails: {
        type: [Object],
        blackbox: true,
        optional: true
      }
});

Meteor.users.helpers({
    fotosPerfil:function(){
        return this.profile.fotos;
    },
    avatarPublicId: function(){
        if (this.profile.avatar){
            var foto = Fotos.findOne({_id: this.profile.avatar});
            if (foto){
                return foto.imagem.publicId;    
            }else{
                return false
            }
        }else{
            return false;
        }
    },
    countPerfis:function(){
        return Perfis.find({userId:this._id}).count();
    },
    countFotos:function(){
        return Fotos.find({userId:this._id}).count();   
    }
});

Meteor.users.attachSchema(Schemas.User);
Meteor.users.attachBehaviour('timestampable');



if (Meteor.isServer){
    Meteor.users.before.insert(function(userId,doc){
        doc.profile.nomeCompleto = doc.profile.nome + " " + doc.profile.sobrenome;
    });    

    Meteor.users.after.insert(function(userId,doc){
        elasticSearch.registrarUsuario(doc._id, doc.profile.nomeCompleto);
    })

    Meteor.users.after.remove(function(userId,doc){
        console.log(elasticSearch.removerUsuario(doc._id));
    })

    Meteor.users.after.update(function(userId,doc,fieldNames,modifier,options){
        //if (modifier.$push && modifier.$push['profile.fotos'])
        //console.log("fieldNames", fieldNames);
        //console.log("modifier", modifier);
        //console.log("options", options);
    })    
}


