//------------------------------------------------------------------------------
function seleciona_filtro_busca_cliente() {
    var filtro = document.getElementById("filtroPesquisa").value;
    var inputPesquisa = document.getElementById("searchInput");
    var iconFiltro = document.getElementById("icon-filtro-pesquisa");

    // Define ícone e placeholder
    function avalia_coluna_cliente() {
        if (filtro === "codigo") {
            iconFiltro.className = "fa fa-solid fa-barcode";
            inputPesquisa.placeholder = "Digite o Código do Cliente";
            inputPesquisa.type = "text";
        } else if (filtro === "nome") {
            iconFiltro.className = "fa fa-solid fa-tag";
            inputPesquisa.placeholder = "Digite o nome do Cliente"
            inputPesquisa.type = "text";
        } else if (filtro === "nascimento") {
            iconFiltro.className = "fa fa-solid fa-calendar";
            inputPesquisa.type = "date";
        } else if (filtro === "cpf") {
            iconFiltro.className = "fa-solid fa-passport";
            inputPesquisa.placeholder = "Digite o CPF do Cliente";
            inputPesquisa.type = "text";
        } else {
            iconFiltro.className = "fa-solid fa-file";
            inputPesquisa.placeholder = "Digite o RG do Cliente"
            inputPesquisa.type = "text";
        }
    }
    avalia_coluna_cliente();
}

//------------------------------------------------------------------------------
function desabilitarCampo(campoId, desabilitar) {
    var campo = document.getElementById(campoId);
    campo.disabled = desabilitar;
    if (desabilitar) {
        campo.value = ""; // Limpa o campo se estiver desabilitado
    }
}
//------------------------------------------------------------------------------
// Array global para armazenar os clientes
let clientes = [];

// Função chamada pelo botão "Salvar"
function salvar_cliente() {
    // 1. Acessa e obtém os valores dos campos
    var codigo = document.getElementById('codigoCliente').value.toUpperCase();
    var nome = document.getElementById('nomeCliente').value.toUpperCase();
    var nascimento = document.getElementById('nascimentoCliente').value;
    console.log("Data de Nascimento:", nascimento);
    var cep = document.getElementById('cepCliente').value;
    var endereco = document.getElementById('enderecoCliente').value.toUpperCase();
    var numero = document.getElementById('numeroCliente').value;
    var bairro = document.getElementById('bairroCliente').value.toUpperCase();
    var cidade = document.getElementById('cidadeCliente').value.toUpperCase();
    var nomeMae = document.getElementById('nomeMaeCliente').value.toUpperCase();
    var nomePai = document.getElementById('nomePaiCliente').value.toUpperCase();
    var celular = document.getElementById('celularCliente').value;
    var cpf = document.getElementById('cpfCliente').value;
    var rg = document.getElementById('rgCliente').value;
    var email = document.getElementById('emailCliente').value.toUpperCase();
    
    let nascimentoFormatado = '';
    if (nascimento) {
        // Divide a string da data (AAAA-MM-DD) em um array [AAAA, MM, DD]
        const partesData = nascimento.split('-');
        // Reorganiza as partes para o formato DD/MM/AAAA
        nascimentoFormatado = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    }

    // Pequena validação para garantir que o nome foi preenchido
    if (nome.trim() === '') {
        alert("O campo 'Nome Cliente' é obrigatório.");
        return; // Sai da função se o nome estiver vazio
    }

    // 2. Cria um objeto com os dados do cliente
    const novoCliente = {
        codigo: codigo,
        nome: nome,
        nascimento: nascimento,
        cep: cep,
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        nomeMae: nomeMae,
        nomePai: nomePai,
        celular: celular,
        cpf: cpf,
        rg: rg,
        email: email
    };

    // 3. Adiciona o novo objeto ao array de clientes
    clientes.push(novoCliente);

    // Exibe o array no console para verificação
    console.log("Cliente salvo! Array de clientes:", clientes);

    // 4. Adiciona a nova linha à tabela
    const tbody = document.getElementById('body-tabela-clientes');
    const tr = document.createElement('tr');
    const enderecoCompleto = `${endereco}, ${numero} - ${bairro} - ${cidade}`;
    const dados = [
        codigo,
        nome,
        nascimentoFormatado,
        enderecoCompleto,
        cpf,
        cep,
        celular
    ];
    
    dados.forEach(valor => {
        const td = document.createElement('td');
        td.textContent = valor;
        tr.appendChild(td);
    });

    const tdBotoes = document.createElement('td');
    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-primary btn-small';
    btnEditar.innerHTML = '<i class="fa-solid fa-pencil"></i>';

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'btn btn-danger btn-small';
    btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnExcluir.onclick = () => {
        tr.remove();
        // Remove o cliente do array usando o código
        const index = clientes.findIndex(c => c.codigo === novoCliente.codigo);
        if (index > -1) {
            clientes.splice(index, 1);
        }
        console.log("Cliente removido! Array de clientes atualizado:", clientes);
    };

    tdBotoes.appendChild(btnEditar);
    tdBotoes.appendChild(btnExcluir);
    tr.appendChild(tdBotoes);
    tbody.appendChild(tr);

    // Limpa o formulário após o salvamento
    limpar_dados();
    
    // Atualiza o campo de código para o próximo cliente
    atualiza_codigo_cliente();
}

// Lógica da função para desabilitar o campo do nome do pai
function desabilitarCampo(idCampo, isChecked) {
    const campo = document.getElementById(idCampo + 'Cliente');
    if (campo) {
        campo.disabled = isChecked;
        if (isChecked) {
            campo.value = ''; // Limpa o valor se for desabilitado
        }
    }
}

// Lógica da função para limpar os dados
function limpar_dados() {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.value = '';
    });
    const checkboxPai = document.getElementById('naoInformarPai');
    if (checkboxPai) {
        checkboxPai.checked = false;
        desabilitarCampo('nomePai', false);
    }
    // Garante que o campo de código seja preenchido com o próximo ID
    atualiza_codigo_cliente();
}

// FUNÇÃO CORRIGIDA: Usa o tamanho do array 'clientes'
function atualiza_codigo_cliente() {
    // Pega a quantidade de clientes no array e soma 1 para o próximo ID
    const proximoId = clientes.length + 1;
    // Formata o ID para ter 3 dígitos, preenchendo com zeros à esquerda
    const cliente_atual = "CL_" + String(proximoId).padStart(3, '0');
    
    // Atualiza o campo do formulário
    const input_codigo_cliente = document.getElementById("codigoCliente");
    input_codigo_cliente.value = cliente_atual;
    
    console.log("Próximo código do cliente:", cliente_atual);
}

// Chame a função uma vez ao carregar a página para definir o código inicial
document.addEventListener('DOMContentLoaded', atualiza_qtd_cliente);