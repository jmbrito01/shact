Schemas.UserTags = new SimpleSchema({
  tagId: {
    type: String
  },
  fotoId: {
    type: String
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
    autoValue: function() {
      var nome = this.field("profile.nome");
      var sobrenome = this.field("profile.sobrenome");
      //console.log("AQUI", nome, sobrenome);
      if (nome.isSet && sobrenome.isSet) {
        return nome.value + " " + sobrenome.value;
      }
    },
    autoform: {
      omit: true
    },
  },
  nascimento: {
    type: Date,
    optional: true
  },
  genero: {
    type: String,
    optional: true,
    allowedValues: ['male', 'female'],
    autoform: {
      type: "select",
      options: [
        {
          label: "Masculino",
          value: "male"
        },
        {
          label: "Feminino",
          value: "female"
        }
            ]
    }
  },
  celular: {
    type: String,
    autoform: {
        type: 'intl-tel',
        class: 'form-control',
        intlTelOptions: {
          autoFormat: true,
          defaultCountry: 'BR',
          utilsScript: 'lib/libphonenumber/build/utils.js'
        }
    }
  },
  avatar: {
    type: String
  },
  fotos: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  cover: {
    type: Schemas.Imagem,
    autoform: {
      omit: true
    }
  },
  tags: {
    type: [Schemas.UserTags],
    autoform: {
      omit: true
    }
  }
});

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
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
    optional: true,
    blackbox: true
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
  contatos: {
    type: [String],
    optional: true
  },
  pendentes: {
    type: [String],
    optional: true
  },
  recentes: {
    type: [String],
    optional: true
  },
  localizacao: {
    type: Schemas.Coordenadas,
    optional: true,
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  registered_emails: {
    type: [Object],
    blackbox: true,
    optional: true
  }
});

Meteor.users.helpers({
  fotosPerfil: function() {
    return this.profile.fotos;
  },
  email: function() {
    return this.emails[0].address || "Não cadastrado";
  },
  avatarPublicId: function() {
    if (this.profile.avatar) {
      var foto = Fotos.findOne({
        _id: this.profile.avatar
      });
      if (foto) {
        return foto.imagem.publicId;
      } else {
        return false
      }
    } else {
      return false;
    }
  },
  countPerfis: function() {
    return Perfis.find({
      userId: this._id
    }).count();
  },
  countFotosPrivadas: function() {
    return Fotos.find({
      userId: this._id,
      tipo: TIPO_PRIVADO
    }).count();
  },
  /*
  pendentes:function(){
      return Conexoes.find({'userIds.1':this._id, status: CONEXAO_PENDENTE});        
  },
  */
  conexoes: function() {
    return Conexoes.find({
      'userIds': this._id,
      status: CONEXAO_ACEITA
    });
  },
  conexoesCount: function() {
    return Conexoes.find({
      'userIds': this._id,
      status: CONEXAO_ACEITA
    }).count();
  },
  existeConexao: function(userId) {
    if (userId == Meteor.userId()) return false;

    var c = Conexoes.findOne({
      userIds: {
        $all: [this._id, userId]
      }
    });
    return (c) ? c : false;
  },
  prc: function() {
    var pendentes = this.pendentes || [];
    var recentes = this.recentes || [];
    var contatos = this.contatos || [];
    return _.union(this._id, pendentes, recentes, contatos);
  }
});

Meteor.users.attachSchema(Schemas.User);
Meteor.users.attachBehaviour('timestampable');



if (Meteor.isServer) {
  Meteor.users.before.insert(function(userId, doc) {
    doc.profile.nomeCompleto = doc.profile.nome + " " + doc.profile.sobrenome;
  });

  Meteor.users.after.insert(function(userId, doc) {
    elasticSearch.registrarUsuario(doc._id, doc.profile.nomeCompleto);
  })

  Meteor.users.after.remove(function(userId, doc) {
    console.log(elasticSearch.removerUsuario(doc._id));
  })

  Meteor.users.after.update(function(userId, doc, fieldNames, modifier, options) {
    //if (modifier.$push && modifier.$push['profile.fotos'])
    //console.log("fieldNames", fieldNames);
    //console.log("modifier", modifier);
    //console.log("options", options);
  })
}
