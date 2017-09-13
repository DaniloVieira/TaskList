angular.module('tasklistWeb')
  .controller('tasklist-controller', function ($scope,$http, $routeParams, appResource, cadastroResource) {
   
    const TAB_CADASTRO = 1;
    const TAB_PESQUISA = 2;
    const TIPO_MSG_ALERTA = 'danger';
    const TIPO_MSG_SUCESSO = 'success';
    const TIPO_MSG_ANTECAO = 'warning';
    const TIPO_MSG_INFO = 'info';
        
    var abaAtual = TAB_PESQUISA;
    var ng = $scope;

  	ng.lista_status = [
        "Eletrodomestico",
        "Eletronico",
        "Eletrodomestico",
        "Informática",
        "Telefonia",
        "Móvel",
        "Veículo",
        "Outros"
    ]

    

    var itemExclusao = {};
    var indiceEdicao = null;

    ng.taskList = [
    	{
          
    	  "codigo"      : "A567B11",
    	  "descricao"   : "monitor 29",
    	  "observacao"  : "emprestado",
          "categoria"   : "Informática"
    	},{
          
    	  "codigo"      : "C321H69",
    	  "descricao"   : "mesa escritorio",
    	  "observacao"  : "emprestado",
          "categoria"   : "Móvel"
    	},{
          
    	  "codigo"      : "V1719Q01",
    	  "descricao"   : "automóvel gol",
    	  "observacao"  : "emprestado",
          "categoria"   : "Veículo"
    	}
    ]
    
    // Metodo que trata o evento de click do botao salvar
    ng.onClickBtnSalvar = function(){    

        if(validarCampos() && verificarCadastroRepedito()){
        	
        	cadastroResource.cadastrar(ng.task)
        	.then(function(dados) {
				ng.mensagem = dados.mensagem;
				if(dados.inclusao) ng.task = {};
			})
        	.catch(function(erro) {
				ng.mensagem = erro.mensagem;
			})
        
            /*if(indiceEdicao != null) {
                ng.taskList[indiceEdicao] = ng.task;
            }
            else {            
                ng.taskList.push(ng.task);
            } */

            ng.onClickBtnLimparCampos(); 
            onControlarTab(TAB_PESQUISA);
            onExibirNotificacao("Patrimonio salvo com sucesso.", "ATENÇÃO", TIPO_MSG_SUCESSO);
        }           
        
     }     

    // METODO PARA LIMPAR OS CAMPOS DE FORMULARIO
    ng.onClickBtnLimparCampos = function(){
        ng.task = {};        
        indiceEdicao = null;
        removerBordaVermelhaDeCamposNaoPreenchidos();
    }

     
     // METODO PARA EXIBIR TOASTER DE NOTIFICACAO
     // msg: mensagem da notificação
     // titulo: titulo da notificação
     // tipo: tipo da notificação (TIPO_MSG_ALERTA, TIPO_MSG_INFO, TIPO_MSG_SUCESSO, TIPO_MSG_ATENCAO)
     onExibirNotificacao = function(msg, titulo,  tipo) {       
        $.toaster({ message : msg, title : titulo, priority : tipo });
    };

    // Metodo que trata o evento de click do botao editar do grid de pesquisa
    ng.onClickBtnEditar = function (index, param){
        // se não usar angular.copy a alteracao ocorre direto no objeto da lista
        ng.task = angular.copy(param);
        indiceEdicao = index;      

        // Rogerio
        // Alterar a classe utilizada para um nome melhor e criar um metodo para remover os
        // campos obrigatorios 
        //$('.campo_obrigatorio').removeClass('campoInvalido');
        removerBordaVermelhaDeCamposNaoPreenchidos();
        onControlarTab(TAB_CADASTRO);
    }

    // METODO PARA TRATAR CLICK DE ABERTURA DE MODAL DE EXCLUSAO
    ng.onClickBtnExcluirPatrimonio = function(indice, patrimonio){
        // Rogerio
        // Alterar para uma variavel javascript
        itemExclusao.indice = indice;

        // Rogerio
        // Nao é necessario usar uma classe para preencher estes atributos 
        // Ex: descricaoPatrimonio
        $("#sp-item-exclusao-descricao").text(patrimonio.descricao);
        $("#sp-item-exclusao-codigo").text(patrimonio.codigo);
        ng.onClickBtnLimparCampos();
    }

    // METODO PARA TRATAR CLICK DE CONFIRMACAO DE EXCLUSAO NO MODAL DE EXCLUSAO
    ng.onClickConfirmarExcluirPatrimonio = function(index){
        // Rogerio
        // Faltou tratamento de erro (try/catch)
        ng.taskList.splice(index, 1);
        onExibirNotificacao("Patrimonio excluído com sucesso.", "ANTEÇÃO", TIPO_MSG_SUCESSO);        
    }

    // METODO PARA VALIDAR O PREENCHIMENTO DOS CAMPOS DE CADASTRO
    validarCampos = function(){ 
        var isValido = true;      
        var camposObrigatorios = $(".campo-obrigatorio");
       
        // Nao seria mais facil remover usando classe?
       // $(".campos-obrigatorios").addClass('campo-invalido');
       // R: utilizando o seletor de classe a comparação é feita somente como o primeiro elemento que tem a classe .campo-obrigatorio
       // este deletor traz um array de obj DOM que tenham a classe .campo-obrigatorio, até o monento a melhor alternativa é percorrer
       // o array para verificar o .val() de cada um.

       removerBordaVermelhaDeCamposNaoPreenchidos();

       for (var i = camposObrigatorios.length - 1; i >= 0; i--) {
           if(camposObrigatorios[i].value.length == 0){
                isValido = false;
                $('#'+camposObrigatorios[i].id).addClass('campo-invalido');
            }
       }      

       if(!isValido){
            onExibirNotificacao("Preencha os campos destacados.", "ANTEÇÃO", TIPO_MSG_ALERTA);
       }

       return isValido;
    }

    // METODO QUE REMOVE A CLASSE campoInvalido QUANDO O CAMPO É PREENCHIDO
    // Rogerio
    // alterar o nome do metodo e chama-lo nos locais que removam a obrigatoriedade dos campos
    removerBordaVermelhaDeCamposNaoPreenchidos = function(){
        $('.campo-obrigatorio').removeClass('campo-invalido');
    }

    // METODO UTILIZADO PARA VERIFICAR REPETICAO NA LISTA DE PATRIMONIO
    verificarCadastroRepedito = function(){
        var lista = angular.copy(ng.taskList);
        var isNaoRepetido = true;

        // Rogerio
        // Colocar comentario do pq
        // remove o elemento da lista quando o mesmo está sendo editado para não ser compardado a ele mesmo.
        if(indiceEdicao != null){
            lista.splice(indiceEdicao, 1);
        } 

        // USADO for NATIVO PORQUE forEach DO ANGULAR NÃO PARA COM return NEM COM break
        for (var i = 0, len = lista.length; i < len; i++) {

            if(lista[i].codigo == ng.task.codigo){
               onExibirNotificacao("Código "+lista[i].codigo+ " já cadastrado.", "ANTEÇÃO", TIPO_MSG_ALERTA);
               isNaoRepetido = false;
               break;
            }
            if(lista[i].descricao == ng.task.descricao){
               onExibirNotificacao("Descrição "+lista[i].descricao+ " já cadastrado.", "ANTEÇÃO", TIPO_MSG_ALERTA);
               isNaoRepetido = false;
               break;
            }
        }

        return isNaoRepetido;
    }

    // METODO PARA CONTROLAR AS ABAS DE CADASTRO E DE PESQUISA
    onControlarTab = function(tab) {
        if(tab == abaAtual) {
            return;
        }

        abaAtual = tab;

        if(tab == TAB_CADASTRO) {
            $('#li-pesquisa').removeClass('active');
            $('#li-cadastro').addClass('active');

            $('#div-pesquisa').fadeOut(500, function(){
                $('#div-cadastro').fadeIn();
            });

        }
        else if(tab == TAB_PESQUISA){
            $('#li-cadastro').removeClass('active');
            $('#li-pesquisa').addClass('active');
            
            $('#div-cadastro').fadeOut(500, function(){
                $('#div-pesquisa').fadeIn();
            });

        }
        
    };
   
  });