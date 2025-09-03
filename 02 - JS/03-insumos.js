const cadastros_insumos_fixos = []
const cadastro_cod_insumos_fixos = []

let lista_insumos = [];

// Variáveis para elementos do formulário
let codigo_insumo, data_info_insumo, nome_insumo, fornecedor_insumo,
    qtd_compra_insumo, preco_total_insumo, frete_insumo, preco_unitario_insumo,
    local_compra_insumo;

var codigo_insumo_fixo = document.getElementById('codigo_insumo_fixo');
var nome_insumo_fixo = document.getElementById('nome_insumo_fixo');
var valor_insumo_fixo = document.getElementById('valor_insumo_fixo');
var dias_insumo_fixo = document.getElementById('dias_insumo_fixo');
var minutos_insumo_fixo = document.getElementById('minutos_insumo_fixo');

//-----------------------------------------------------------------------------------------------------------//
//Função para gerar código de insumo fixo ao carregar a página [FUNCIONAMENTO OK]
window.onload = function gerar_codigo_insumo_fixo(){
    const tam_lista_insumos_fixo = cadastro_cod_insumos_fixos.length +1;
    codigo_insumo_fixo.value =    codigo_insumo.value = 'INSMFX_' + String(tam_lista_insumos_fixo).padStart(3, '0'); 
}

// Calculo de Valor de Insumo Fixo por Minuto de Trabalho [FUNCIONAMENTO OK]
function calcular_minutos(){
    var minutos_trabalho = 60*8;

    dias_insumo_fixo_valor = parseInt(dias_insumo_fixo.value)
    valor_insumo_fixo_valor = parseFloat(valor_insumo_fixo.value)
    if(isNaN(valor_insumo_fixo_valor)|| isNaN(dias_insumo_fixo_valor)){
        minutos_insumo_fixo.value = 0;
    }
    else{
        var valor_minuto_insumo = (valor_insumo_fixo_valor/dias_insumo_fixo_valor/minutos_trabalho).toFixed(2);
        minutos_insumo_fixo.value = valor_minuto_insumo;
    }
}

//Mostra a mensagem de confirmação do Cadastro de Insumo Fixo [FUNCIONAMENTO OK]
function mostrar_mensagem_confirmacao_insumo_fixo(codigo, nome) {
    const body_modal_insumo_fixo = document.getElementById('modal-body-confirmar-cadastro-insumo-fixo');
    const footer_modal_insumo_fixo = document.getElementById('modal-footer-confirmar-cadastro-insumo-fixo');

    body_modal_insumo_fixo.innerHTML =
        `<span class=""><b> Código do Insumo:</b> &nbsp;&nbsp;${codigo}</span><br>
        <span class=""><b> Nome do Insumo:</b> &nbsp;&nbsp;${nome}</span><br>`;

    footer_modal_insumo_fixo.innerHTML =
        `<row>
            <col class="m-auto">
                <button class="btn btn-success">
                    <i class="fa fa-circle-plus "></i>
                        Novo Cadastro
                </button>
                <button class="btn btn-danger" data-bs-dismiss="modal">
                    <i class="fa fa-x ">&nbsp;&nbsp</i>
                    Sair
                </button>
            </col>
        </row>`;
}

function insumo_fixo_provisorio(){
    cadastro_provisorio_fixos.push(codigo_insumo_fixo.value);
}

// Função para adicionar uma nova linha de Insumos Fixos
function adicionarNovoCampoInsumoFixo(novoCodigo) {
    const container = document.getElementById('container-insumos-fixos');
    console.log(lista_insumos.length)

    const novoInsumoHTML = `
        <div class="row my-3">
            <div class="col-2">
                <div class="label">Código Insumo</div>
                <input type="text" class="form-control text-center" value="${novoCodigo}" disabled>
            </div>
            <div class="col">
                <div class="label">Nome da Despesa</div>
                <input type="text" class="form-control">
            </div>
            <div class="col-2">
                <div class="label">Valor da Despesa</div>
                <div class="div">
                    <div class="input-group">
                        <div class="input-group-text">
                            <div class="fa fa-solid fas fa-dollar-sign"></div>
                        </div>
                        <input type="text" class="form-control" onkeyup="calcular_minutos()" id=">
                    </div>
                </div>
            </div>
            <div class="col-1">
                <div class="label">Dias</div>
                <input type="text" class="form-control text-center" value="22" onkeyup="calcular_minutos()">
            </div>
            <div class="col-2">
                <div class="label">Custo por Minuto</div>
                <div class="div">
                    <div class="input-group">
                        <div class="input-group-text">
                            <div class="fa fa-solid fas fa-dollar-sign"></div>
                        </div>
                        <input type="text" class="form-control" disabled>
                    </div>
                </div>
            </div>
            <div class="col">
                <label for="">&nbsp;</label>
                <div>
                    <button class="btn btn-success">
                        <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button class="btn btn-warning text-white">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', novoInsumoHTML);
}

// Função para salvar dados de cadastro de insumos fixos na lista
function salvar_insumos_fixos(){
    // Pega os elementos do formulário
    const codigo_insumo_fixo = document.getElementById('codigo_insumo_fixo');
    const nome_insumo_fixo = document.getElementById('nome_insumo_fixo');
    const valor_insumo_fixo = document.getElementById('valor_insumo_fixo');
    const dias_insumo_fixo = document.getElementById('dias_insumo_fixo');
    const minutos_insumo_fixo = document.getElementById('minutos_insumo_fixo');

    const novo_insumo = {
        codigo_insumo_fx: codigo_insumo_fixo.value,
        nome_insumo_fx: nome_insumo_fixo.value,
        valor_insumo_fx: valor_insumo_fixo.value,
        dias_insumo_fx: dias_insumo_fixo.value,
        minutos_insumo_fx: minutos_insumo_fixo.value,
    };

    cadastros_insumos_fixos.push(novo_insumo);

    // Desabilita os inputs da linha que acabou de ser salva
    codigo_insumo_fixo.disabled = true;
    nome_insumo_fixo.disabled = true;
    valor_insumo_fixo.disabled = true;
    dias_insumo_fixo.disabled = true;
    minutos_insumo_fixo.disabled = true;

    // Chama a função de mensagem de confirmação
    mostrar_mensagem_confirmacao_insumo_fixo(novo_insumo.codigo_insumo_fx, novo_insumo.nome_insumo_fx);

    // Gera o próximo código sequencial
    const tam_lista_insumos_fixo = cadastros_insumos_fixos.length + 1;
    const proximo_codigo = 'INSMFX_' + String(tam_lista_insumos_fixo).padStart(3, '0');

    // Adiciona a nova linha com o código sequencial
    adicionarNovoCampoInsumoFixo(proximo_codigo);
}

// Inicializa quando o DOM estiver carregado [FUNCIONAMENTO OK]
document.addEventListener('DOMContentLoaded', function () {
    codigo_insumo = document.getElementById("codigo_insumos");
    data_info_insumo = document.getElementById("data_compra_insumos");
    nome_insumo = document.getElementById("nome_insumos");
    categoria_insumo = document.getElementById("categoria_insumos");
    fornecedor_insumo = document.getElementById("fornecedor_insumos");
    qtd_compra_insumo = document.getElementById("qtd_compra_insumos");
    preco_total_insumo = document.getElementById("preco_total_insumos");
    frete_insumo = document.getElementById("frete_insumos");
    preco_unitario_insumo = document.getElementById("preco_unitario_insumos");
    local_compra_insumo = document.getElementById("local_compra_insumos");

    // Bloqueia edição de alguns campos
    codigo_insumo.disabled = true;
    preco_unitario_insumo.disabled = true;

    // Carregar dados do localStorage
    carregar_insumos();

    // Atualiza código/data
    atualiza_data();

    // Calcula preço unitário automático ao digitar
    [qtd_compra_insumo, preco_total_insumo, frete_insumo].forEach(campo => {
        campo.addEventListener("input", calcula_preco_unitario);
    });
});

// Atualiza data e gera código do insumo [FUNCIONAMENTO OK]
function atualiza_data() {
    const data_atual = new Date();
    const ano = data_atual.getFullYear();
    const mes = String(data_atual.getMonth() + 1).padStart(2, '0');
    const dia = String(data_atual.getDate()).padStart(2, '0');
    data_info_insumo.value = `${ano}-${mes}-${dia}`;

    const cod_proximo_insumo = lista_insumos.length + 1;
    codigo_insumo.value = 'INSM_' + String(cod_proximo_insumo).padStart(3, '0');
}

// Atualiza apenas o código [FUNCIONAMENTO OK]
function atualiza_codigo_insumo() {
    atualiza_data();
}

// Limpa os campos do formulário
function limpar_dados() {
    nome_insumo.value = "";
    fornecedor_insumo.value = "";
    qtd_compra_insumo.value = "";
    preco_total_insumo.value = "";
    preco_unitario_insumo.value = "";
    frete_insumo.value = "";
    local_compra_insumo.value = "";
    atualiza_data();
}

// Calcula preço unitário [FUNCIONAMENTO OK]
function calcula_preco_unitario() {
    let preco_unitario = 0;
    if (parseFloat(qtd_compra_insumo.value) > 0) {
        preco_unitario = Math.floor(
            (
                (parseFloat(preco_total_insumo.value || 0) +
                parseFloat(frete_insumo.value || 0)) /
                parseFloat(qtd_compra_insumo.value)
            ) * 100
        ) / 100;
    }
    preco_unitario_insumo.value = preco_unitario.toFixed(2);
    return preco_unitario;
}

function salvar_insumos() {
    if (!nome_insumo.value || !qtd_compra_insumo.value || !preco_total_insumo.value) {
        alert("Preencha pelo menos Nome, Quantidade e Preço Total!");
        return;
    }

    // ✅ FORMATAR data para dd/mm/aaaa
    const [ano, mes, dia] = data_info_insumo.value.split("-");
    const data_formatada = `${dia}/${mes}/${ano}`;

    const insumo = {
        codigo: codigo_insumo.value,
        data: data_info_insumo.value,         // formato original ISO
        data_formatada: data_formatada,        // formato amigável
        nome: nome_insumo.value,
        categoria: categoria_insumo.value,
        fornecedor: fornecedor_insumo.value,
        quantidade: qtd_compra_insumo.value,
        preco_total: preco_total_insumo.value,
        frete: frete_insumo.value,
        preco_unitario: calcula_preco_unitario().toFixed(2),
        local_compra: local_compra_insumo.value
    };

    const modal_confirma_body = document.getElementById("modal-confirmar-cadastro-insumo").querySelector(".modal-body");
    modal_confirma_body.innerHTML = `
        <table class="table table-borderless text-center">
            <tr><td><b>Código do Insumo:</b></td><td>${insumo.codigo}</td></tr>
            <tr><td><b>Data da Compra:</b></td><td>${insumo.data_formatada}</td></tr>
            <tr><td><b>Nome do Insumo:</b></td><td>${insumo.nome}</td></tr>
            <tr><td><b>Categoria do Insumo:</b></td><td>${insumo.categoria}</td></tr>
            <tr><td><b>Fornecedor do Insumo:</b></td><td>${insumo.fornecedor}</td></tr>
            <tr><td><b>Preço Total do Insumo:</b></td><td>${insumo.preco_total}</td></tr>
            <tr><td><b>Quantidade de Insumo:</b></td><td>${insumo.quantidade}</td></tr>
            <tr><td><b>Preço Unitário do Insumo:</b></td><td>${insumo.preco_unitario}</td></tr>
        </table>
    `;

    lista_insumos.push(insumo);
    salvar_localStorage();
    renderizar_insumo_na_tabela(insumo);
    limpar_dados();
}

//
function renderizar_insumo_na_tabela(insumo) {
    const tbody = document.getElementById("body-tabela-insumos");
    const tr = document.createElement("tr");

    let data_formatada = insumo.data_formatada;
    if (!data_formatada && insumo.data.includes("-")) {
        const [ano, mes, dia] = insumo.data.split("-");
        data_formatada = `${dia}/${mes}/${ano}`;
    }

    const dados = [
        insumo.codigo,
        data_formatada,
        insumo.nome,
        insumo.categoria || "-",
        insumo.fornecedor || "-",
        "R$ " + insumo.preco_unitario,
        insumo.quantidade
    ];

    dados.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
    });

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn btn-danger btn-sm mx-1";
    botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
    botaoExcluir.addEventListener("click", function () {
        remover_insumo(tr, insumo.codigo);
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "btn btn-warning btn-sm mx-1";
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
    botaoEditar.addEventListener("click", function () {
        editar_insumo(insumo);
    });

    tdAcoes.appendChild(botaoEditar);
    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);

    atualiza_codigo_insumo();
}

// Remover insumo
function remover_insumo(linha, codigo) {
    linha.remove();
    lista_insumos = lista_insumos.filter(insumo => insumo.codigo !== codigo);
    salvar_localStorage();
    atualiza_codigo_insumo();
}

// Editar insumo
function editar_insumo(insumo) {
    codigo_insumo.value = insumo.codigo;
    data_info_insumo.value = insumo.data;
    nome_insumo.value = insumo.nome;
    fornecedor_insumo.value = insumo.fornecedor;
    qtd_compra_insumo.value = insumo.quantidade;
    preco_total_insumo.value = insumo.preco_total;
    frete_insumo.value = insumo.frete;
    preco_unitario_insumo.value = insumo.preco_unitario;
    local_compra_insumo.value = insumo.local_compra;
}

// LocalStorage
function salvar_localStorage() {
    localStorage.setItem("lista_insumos", JSON.stringify(lista_insumos));
}

function carregar_insumos() {
    const dados = localStorage.getItem("lista_insumos");
    if (dados) {
        lista_insumos = JSON.parse(dados);
        lista_insumos.forEach(insumo => renderizar_insumo_na_tabela(insumo));
    }
}


// Atualiza select de fornecedores [FUNCIONAMENTO OK]
function atualizarSelectFornecedores() {
    const select = fornecedor_insumo;
    if (!select) return;

    // Limpa opções atuais
    select.innerHTML = '<option value=""></option>';

    // Busca fornecedores no localStorage
    const lista_fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
    lista_fornecedores.forEach(fornecedor => {
        const option = document.createElement("option");
        option.value = fornecedor.nome;
        option.textContent = fornecedor.nome;
        select.appendChild(option);
    });
}

// Atualiza select ao carregar a página [FUNCIONAMENTO OK]
document.addEventListener('DOMContentLoaded', function () {
    atualizarSelectFornecedores();
});

