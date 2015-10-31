tentarConexao = function(userId, metodo){
	var popup = function(text){
		 IonPopup.alert({
	      title: 'Espera aí!',
	      template: text,
	      okText: 'Ok'
	    });							
	}
	if(userId!=Meteor.userId()){
		var conexao = Meteor.user().existeConexao(userId)
		if (conexao.status===0){
			popup("Você já pediu para se conectar com esta pessoa");
		}else if (conexao.status===1){
			popup("Você já é amigo desta pessoa");
		}else if (conexao.status===2){
			popup("Sua conexão com esta pessoa foi rejeitada :(");
		}else if (conexao===false){
			IonModal.open("conexoesAdd",{id: userId, metodo:metodo});
		}
	}else{
		popup("Este é você! hehe");
	}	
}