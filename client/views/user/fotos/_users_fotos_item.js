Template.userFotosItem.events({
    'click .acoes-user-fotos':function(){
        var self = this;

        var texto, acao;
        if (Meteor.user().profile.avatar==self._id){
            texto = 'Remover do perfil';
            acao = function(){
                Meteor.call('setAvatar','');
            }
        }else{
            texto = 'Setar perfil';
            acao = function(){
                Meteor.call('setAvatar',self._id);
            }            
        }
        IonActionSheet.show({
          titleText: 'Foto',
          buttons: [
            { text: texto},
          ],

          destructiveText: '<i class="icon ion-trash-outline"></i> Deletar',
          cancelText: 'Cancel',
          destructiveButtonClicked: function() {
            Meteor.call('removerFoto',self._id);
            return true;
          },
          buttonClicked: function(index) {
            if (index === 0) {
              acao();
            }
            return true;
          },          
        });
    }
})

Template.userFotosItem.helpers({
    icon : function(){
        if (this.reconhecimento.status==1){
            return 'fa fa-cog fa-spin';
        }else if(this.reconhecimento.status==2){
            return '';
        } else if (this.reconhecimento.status==3){
            return 'fa fa-times';
        }
    }
})