// ==================== FORNECEDORES ====================

// Carrega fornecedores já salvos, ou cria vazio
let lista_fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// Elementos do formulário
var codigo = document.getElementById("codigoFornecedor");
var cnpj = document.getElementById("cnpjFornecedor");
var nome = document.getElementById("nomeFornecedorModal");
var cep = document.getElementById("cepFornecedor");
var endereco = document.getElementById("enderecoFornecedor");
var numero = document.getElementById("numeroFornecedor");
var bairro = document.getElementById("bairroFornecedor");
var cidade = document.getElementById("cidadeFornecedor");
var tipo_contato = document.getElementById('tipocontatoFornecedor');
var contato = document.getElementById("contatoFornecedor");
var tipo_compra = document.getElementById("tipoCompraFornecedor");
var vendedor = document.getElementById("vendedorFornecedor");
var observacoes = document.getElementById("observacoesFornecedor");
var insumo = document.getElementById("insumoFornecedor");

// Limpa os dados do formulário [Funcionamento OK]
function limpar_dados(){
    cnpj.value = "";
    nome.value = "";
    cep.value = "";
    endereco.value = "";
    numero.value = "";
    bairro.value = "";
    cidade.value = "";
    tipo_compra.value = ""
    contato.value = "";
    tipo_compra.value = "";
    vendedor.value = "";
    observacoes.value = "";
    insumo.value = "";
}

// Atualiza o código do fornecedor [Funcionamento OK]
function atualiza_codigo_fornecedores(){
    const cod_proximo_fornecedor = lista_fornecedores.length + 1;
    const mensagem_atual = 'CL_' + String(cod_proximo_fornecedor).padStart(3, '0');
    codigo.value = mensagem_atual;
}

// Formata o CNPJ durante a digitação  [Funcionamento OK]
document.getElementById("cnpjFornecedor").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 14) valor = valor.substring(0, 14);
    let formatado = valor;

    if (valor.length > 2) {formatado = valor.substring(0, 2) + "." + valor.substring(2);}
    if (valor.length > 8) {formatado = formatado.substring(0, 9) + "/" + formatado.substring(9);}
    if (valor.length > 12) {formatado = formatado.substring(0, 14) + "-" + formatado.substring(14);}

    e.target.value = formatado;
});

// Formata o CEP durante a digitação [Funcionamento OK]
document.getElementById("cepFornecedor").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // só números
    if (valor.length > 8) valor = valor.substring(0, 8);

    let formatado = valor;

    if (valor.length > 5) {
        // 35.560-000
        formatado = valor.substring(0, 2) + "." + valor.substring(2, 5) + "-" + valor.substring(5, 8);
    } else if (valor.length > 2) {
        // 35.5 / 35.56 / 35.560
        formatado = valor.substring(0, 2) + "." + valor.substring(2);
    }

    e.target.value = formatado;
});

// Formata a Máscara do CONTATO durante a digitação [Funcionamento OK]
document.getElementById("contatoFornecedor").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // só números
    let formatado = ""; // deixa a variável acessível para os dois blocos

    if (tipo_contato.value === 'contato_celular') {
        // Celular: (11) 9XXXX-XXXX
        if (valor.length > 11) valor = valor.substring(0, 11);

        if (valor.length > 0) formatado = '(' + valor.substring(0, 2);
        if (valor.length > 2) formatado += ') ' + valor.substring(2, 3); // 9º dígito
        if (valor.length > 3) formatado += '.' + valor.substring(3, 7);
        if (valor.length > 7) formatado += '-' + valor.substring(7, 11);
    } 
    else {
        // Fixo: (11) XXXX-XXXX
        if (valor.length > 10) valor = valor.substring(0, 10);
        if (valor.length > 0) formatado = '(' + valor.substring(0, 2);
        if (valor.length > 2) formatado += ') ' + valor.substring(2, 6);
        if (valor.length > 6) formatado += '-' + valor.substring(6, 10);
    }
    e.target.value = formatado;
});


// Salva os dados do fornecedor [Funcionamento OK]
function salvar_fornecedores() {
    var novoFornecedor = {
        codigo: codigo.value,
        cnpj: cnpj.value,
        nome: nome.value,
        cep: cep.value,
        endereco: endereco.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        contato: contato.value,
        tipo_compra: tipo_compra.value,
        insumo: insumo.value
    };

    lista_fornecedores.push(novoFornecedor);
    localStorage.setItem("fornecedores", JSON.stringify(lista_fornecedores));

    limpar_dados();
    renderizarFornecedorNaTabela(novoFornecedor);

    const modal_confirma_body = document.getElementById("modal-alerta-cadastro").querySelector(".modal-body");
    modal_confirma_body.innerHTML = `
        <h5 class="modal-title mt-4 text-center fas-5" style="color: lightred;">Confirmação de Cadastro de Novo Fornecedor !</h5>
        <br>
        <table class="table table-borderless text-center">
            <tr><td><b>Código:</b></td><td>${novoFornecedor.codigo}</td></tr>
            <tr><td><b>Nome:</b></td><td>${novoFornecedor.nome}</td></tr>
            <tr><td><b>CNPJ:</b></td><td>${novoFornecedor.cnpj}</td></tr>
        </table>
    `;
}

// Atualiza o filtro de pesquisa [Funcionamento OK]
document.addEventListener('DOMContentLoaded', function() {
    const filtroSelect = document.getElementById("filtroPesquisa");
    const searchInput = document.getElementById("searchInput");
    const iconSpan = document.getElementById("icon-filtro-pesquisa");

    const dadosFiltros = {
        "codigo": {icone: 'fa-barcode', placeholder: "Digite o código do fornecedor"},
        "cnpj": {icone: 'fa-id-card', placeholder: "Digite o CNPJ do fornecedor"},
        "nome": {icone: 'fa-user', placeholder: "Digite o nome do fornecedor"},
        "cep": {icone: 'fa-map-pin', placeholder: "Digite o CEP do fornecedor"},
        "tipo_compra": {icone: 'fa-shopping-cart', placeholder: "Digite o tipo de compra"},
        "none": {icone: 'fa-search', placeholder: ""}
    };

    function atualizaFiltroFornecedores() {
        const filtro = filtroSelect.value;
        const dados = dadosFiltros[filtro];
        const iconElement = iconSpan.querySelector('i');
        if (iconElement) {iconElement.className = `fa fa-solid ${dados.icone}`;}
        searchInput.placeholder = dados.placeholder;
    }

    filtroSelect.addEventListener('change', atualizaFiltroFornecedores);
    atualizaFiltroFornecedores();

    // Renderiza os fornecedores já salvos no localStorage
    lista_fornecedores.forEach(fornecedor => {
        renderizarFornecedorNaTabela(fornecedor);
    });

    atualiza_codigo_fornecedores();
});

// Renderiza um fornecedor na tabela [Funcionamento OK]
function renderizarFornecedorNaTabela(fornecedor) {
    const tbody = document.getElementById("body-tabela-fornecedores");
    const tr = document.createElement("tr");

    const enderecoCompleto = `${fornecedor.endereco}, ${fornecedor.numero} - ${fornecedor.bairro}, ${fornecedor.cidade}`;

    const dados = [
        fornecedor.codigo,
        fornecedor.cnpj,
        fornecedor.nome,
        enderecoCompleto,
        fornecedor.contato,
        fornecedor.insumo
    ];

    dados.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
    });

    // Ações
    const tdAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "btn btn-primary btn-sm";
    botaoEditar.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    botaoEditar.style.marginRight = "5px";
    botaoEditar.addEventListener("click", function() {
        editarFornecedor(this);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn btn-danger btn-sm";
    botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
    botaoExcluir.addEventListener("click", function() {
        removerFornecedor(this, fornecedor.codigo);
    });

    tdAcoes.appendChild(botaoEditar);
    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);

    atualiza_codigo_fornecedores();
}

// Função para remover um fornecedor
function removerFornecedor(botao, codigoFornecedor) {
    const linha = botao.closest("tr");
    linha.remove();

    // Remove da lista e do localStorage
    lista_fornecedores = lista_fornecedores.filter(f => f.codigo !== codigoFornecedor);
    localStorage.setItem("fornecedores", JSON.stringify(lista_fornecedores));

    console.log("Fornecedor removido");
    atualiza_codigo_fornecedores();
}

// Atualiza select de insumos
function atualizarSelectInsumos() {
    const select = insumo; // seu <select> já capturado no topo do código
    if (!select) return;

    // Limpa opções atuais
    select.innerHTML = '<option value=""></option>';

    // Busca insumos no localStorage
    const lista_insumos = JSON.parse(localStorage.getItem("lista_insumos")) || [];
    lista_insumos.forEach(insumoItem => {
        const option = document.createElement("option");
        option.value = insumoItem.nome;  // pode usar insumoItem.codigo se preferir
        option.textContent = `${insumoItem.codigo} - ${insumoItem.nome}`;
        select.appendChild(option);
    });
}

// Chama quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    atualizarSelectInsumos();
});
