const FOTO_WIDTH = 500;
const FOTO_HEIGHT = 500;
const FOTO_QUALITY = 100;

const STATUS_IDLE = 0; //esperando pra tirar foto
const STATUS_UPLOADING = 1;
const STATUS_RECONHECIMENTO = 2;
const STATUS_ERRO = 3;
const STATUS_SUCESSO = 4;

var status = new ReactiveVar(STATUS_IDLE);

function handleError(err) {
  sAlert.error(err);
  Meteor.setTimeout(() => {
    Router.go('home');
  })
}


function tirarFoto() {
  MeteoricCamera.getPicture({
    width: FOTO_WIDTH,
    height: FOTO_HEIGHT,
    quality: FOTO_QUALITY
  }, function(error, data) {
    if (data && !error) {
      //Camera Ok
      Session.set('fotoAtual', data);
      status.set(STATUS_UPLOADING);
      IonLoading.show({
        backdrop:true,
        customTemplate: Blaze.toHTML(Template.ionLoadingUpload)
      });
      Cloudinary._upload_file(data, {}, function(error, res) {
        if (res && !error) {
          status.set(STATUS_RECONHECIMENTO);
          IonLoading.hide();
          IonLoading.show({
            backdrop: true,
            customTemplate: Blaze.toHTML(Template.ionLoadingReconhecendo)
          })
          Meteor.call('cadastrarFoto', res.public_id, res.secure_url, TIPO_PUBLICO, function(error, res) {
            if (res && !error) {
              var fotoId = res;
              Meteor.call('reconhecerFaces', res, function(err, res) {
                if (!err && res) {
                  IonLoading.hide();
                  Session.set('mostrarTags', true);
                  Router.go('fotos.view', {
                    fotoId: fotoId
                  });

                  if (Meteor.user().primeiraFoto) {
                    Meteor.users.update({_id: Meteor.userId()}, {$set: {primeiraFoto: false}});
                  }
                }else {
                  handleError("Erro reconhecendo faces");
                }
              });
            } else {
              handleError("Erro cadastrando foto");
            }
          })
        } else {
          handleError("Erro fazendo upload");
        }
      });
    } else {
      if (error.error !== 'cancel'){
        handleError("Erro obtendo foto");
      } else {
        Router.go('home');
      }
    }
  });
}


Template.selfieBusca.onRendered(function() {
  /*
  if (!Meteor.user().primeiraFoto) {
    tirarFoto();
  }
  */
  Session.setDefault('fotoAtual', '');
  tirarFoto();
});

Template.selfieBusca.onRendered(function() {
  //this.$('#pessoa1').css('background-color','red');
  Session.set('fotoAtual', '');
  status.set(STATUS_IDLE);
})

Template.selfieBusca.helpers({
  fotoAtual: function() {
    return Session.get('fotoAtual');

  },
  status: function() {
    return status.get();
  },
  statusItem: function() {
    var icone, texto, cor
    switch (status.get()) {
      case STATUS_IDLE:
        icone = "fa fa-camera";
        texto = "Tire uma foto com a galera!";
        break;
      case STATUS_UPLOADING:
        icone = "fa fa-spinner fa-spin";
        texto = "Enviando foto para o servidor...";
        break;
      case STATUS_RECONHECIMENTO:
        icone = "fa fa-cog fa-spin";
        texto = "Reconhecendo faces...";
        break;
      case STATUS_ERRO:
        icone = "fa fa-times";
        texto = "Algum erro ocorreu!";
        break;
      case STATUS_SUCESSO:
        icone = "fa fa-check";
        texto = "Sucesso";
        break;
    }

    return {
      icone: icone,
      texto: texto,
      cor: cor
    }
  }
})

Template.selfieBusca.events({
  'click #tirar-foto': function() {
    tirarFoto();
  },
});
