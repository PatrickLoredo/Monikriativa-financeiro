// ARRAYS PRINCIPAIS
const cadastros_insumos_fixos_PRODUTOS = [];
const cadastro_cod_insumos_fixos_PRODUTOS = [];
let lista_produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let lista_categorias_produtos = JSON.parse(localStorage.getItem("categorias")) || [];
const valor_provisorio_lucro = 0;

const button_percentual_shopee_editar = document.getElementById("button_percentual_shopee_editar");
const button_percentual_shopee_salvar = document.getElementById("button_percentual_shopee_salvar");

const select_tipo_venda = document.getElementById("select_tipo_venda").value;
    const preco_venda = document.getElementById("valor_venda_input");
    const percentual_shopee = document.getElementById("input_percentual_shopee");
    const custo_insumos = document.getElementById("valor_insumo_input");

    const lucro_shopee_input = document.getElementById("valor_lucro_shopee_input"); // input onde o lucro será exibido
    const lucro_fisico_input = document.getElementById("valor_lucro_fisico_input"); // input onde o lucro será exibido
    const lucro_misto_shopee_input = document.getElementById("valor_lucro_misto_shopee_input"); 
    const lucro_misto_fisico_input = document.getElementById("valor_lucro_misto_fixo_input");
let somaTotalInsumos = 0;



/*
document.addEventListener("DOMContentLoaded", function() {
    // Atualiza o código do produto
    const codigo_produto = document.getElementById("codigo_produto");
    if(codigo_produto){
        codigo_produto.value = `PROD_1`; // ou use sua função atualiza_codigo_produto()
    }

    // Abre o modal automaticamente
    const modalEl = document.getElementById('modal_cadastro_produtos');
    const modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
});*/





// FUNÇÕES GLOBAIS

// Abre modal de insumos
function custo_nao_sabe() {
    const modalEl = document.getElementById('modal-insumo-produto');
    const modalInstance = new bootstrap.Modal(modalEl);
    abrirModalInsumos(modalInstance);
}

// Reabre modal de cadastro de produto
function reabrirModalCadastroProduto() {
    const modalEl = document.getElementById('modal_cadastro_produtos');
    const modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
}

// Atualiza código do produto automaticamente
function atualiza_codigo_produto() {
    const codigo_produto = document.getElementById("codigo_produto");
    if(codigo_produto) {
        codigo_produto.value = `PROD_${lista_produtos.length + 1}`;
    }
}

// Calcula total individual de cada insumo
function calcularTotal(index){
    const precoUnit = parseFloat(document.getElementById(`preco_unitario_naosabe_${index}`).value) || 0;
    const qtd = parseInt(document.getElementById(`qtd_insumo_naosabe_${index}`).value) || 0;
    document.getElementById(`preco_total_insumo_naosabe_${index}`).value = (precoUnit * qtd).toFixed(2);
    calcularTotalGeral();
}

// Calcula total geral dos insumos
function calcularTotalGeral(){
    const lista_insumos_variaveis = JSON.parse(localStorage.getItem("lista_insumos")) || [];
    let soma = 0;
    lista_insumos_variaveis.forEach((_, i) => {
        soma += parseFloat(document.getElementById(`preco_total_insumo_naosabe_${i}`).value) || 0;
    });
    const inputTotal = document.getElementById("total-valor-insumo-nao-sabe");
    if(inputTotal) inputTotal.value = soma.toFixed(2);
    somaTotalInsumos = soma;
}

// Abre modal de insumos e cria inputs
function abrirModalInsumos(modalInstance){
    const inputTotal = document.getElementById("total-valor-insumo-nao-sabe");
    if(inputTotal) inputTotal.value = '';

    const lista_insumos_variaveis = JSON.parse(localStorage.getItem("lista_insumos")) || [];
    const inputValor = document.getElementById("valor_insumo_input");
    if(inputValor) inputValor.disabled = true;

    const modalBody = document.getElementById("modal-body-lista-insumos-nao-sei");
    modalBody.innerHTML = "";

    lista_insumos_variaveis.forEach((insumo, i) => {
        modalBody.innerHTML += `
        <div class="row mb-2">
            <div class="col-2"><input type="text" class="form-control" value="${insumo.codigo}" disabled></div>
            <div class="col-4"><input type="text" class="form-control" value="${insumo.nome}" disabled></div>
            <div class="col-2">
                <div class="input-group">
                    <span class="input-group-text">R$</span>
                    <input type="text" class="form-control" id="preco_unitario_naosabe_${i}" value="${insumo.preco_unitario}" disabled>
                </div>
            </div>
            <div class="col-2">
                <input type="number" class="form-control" id="qtd_insumo_naosabe_${i}" min="0" value="0" oninput="calcularTotal(${i})">
            </div>
            <div class="col-2">
                <div class="input-group">
                    <span class="input-group-text">R$</span>
                    <input type="text" class="form-control" id="preco_total_insumo_naosabe_${i}" value="0" disabled>
                </div>
            </div>
        </div>`;
    });

    modalInstance.show();
}

// Salva insumos do produto e atualiza valor
function salvar_insumos_novo_produto(){
    const inputValor = document.getElementById("valor_insumo_input");
    if(inputValor) inputValor.value = somaTotalInsumos.toFixed(2);

    // Fecha modal de insumos
    const modalEl = document.getElementById('modal-insumo-produto');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if(modalInstance) modalInstance.hide();

    // Reabre modal de cadastro de produto
    reabrirModalCadastroProduto();
}

// Ao carregar o DOM
document.addEventListener("DOMContentLoaded", function() {
    const buttonFecharModal = document.getElementById('fechar_modal_insumo_produto');

    // Fecha modal de insumos e reabre modal de cadastro
    if(buttonFecharModal){
        buttonFecharModal.addEventListener("click", function(){
            const modalEl = document.getElementById('modal-insumo-produto');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if(modalInstance) modalInstance.hide();
            reabrirModalCadastroProduto();
        });
    }
});

function editar_percentual_shopee(){
    const input_percentual_shopee = document.getElementById("input_percentual_shopee");
    const button_percentual_shopee_salvar = document.getElementById("button_percentual_shopee_salvar");
    const button_percentual_shopee_editar = document.getElementById("button_percentual_shopee_editar");
    input_percentual_shopee.disabled = false;
    button_percentual_shopee_salvar.className = 'input-group-text btn btn-success d-block' 
    button_percentual_shopee_editar.className = 'input-group-text btn btn-primary d-none' 
}
function salvar_percentual_shopee(){
    const input_percentual_shopee = document.getElementById("input_percentual_shopee");
    const button_percentual_shopee_salvar = document.getElementById("button_percentual_shopee_salvar");
    const button_percentual_shopee_editar = document.getElementById("button_percentual_shopee_editar");
    input_percentual_shopee.disabled = true;
    button_percentual_shopee_salvar.className = 'input-group-text btn btn-sucess d-none' 
    button_percentual_shopee_editar.className = 'input-group-text btn btn-primary d-block'

    calcula_lucro_produto();
}

function verifica_tipo_venda(){
    const select_tipo_venda = document.getElementById("select_tipo_venda");
    const div_lucro_shopee = document.getElementById("div_lucro_shopee");
    const div_lucro_fisica = document.getElementById("div_lucro_fisica");

    switch (select_tipo_venda.value) {
        case "vazio":
            div_lucro_shopee.className = "col-2 mt-3 d-none";
            div_lucro_fisica.className = "col-2 mt-3 d-none";
            div_lucro_misto.className = "col-2 mt-3 d-none";
            break;

        case "venda_shopee":
            div_lucro_shopee.className = "col-2 mt-3 d-block";
            div_lucro_fisica.className = "col-2 mt-3 d-none";
            div_lucro_misto.className = "col-2 mt-3 d-none";
            break;

        case "venda_fisica":
            div_lucro_shopee.className = "col-2 mt-3 d-none";
            div_lucro_fisica.className = "col-2 mt-3 d-block";
            div_lucro_misto.className = "col-2 mt-3 d-none";
            break;

        default:
            div_lucro_shopee.className = "col-2 mt-3 d-none";
            div_lucro_fisica.className = "col-2 mt-3 d-none";
            div_lucro_misto.className = "col mt-3 d-block";
            break;
    }
}


function calcula_lucro_produto() {
    const select_tipo_venda = document.getElementById("select_tipo_venda").value;
    const preco_venda = document.getElementById("valor_venda_input");
    const percentual_shopee = document.getElementById("input_percentual_shopee");
    const custo_insumos = document.getElementById("valor_insumo_input");

    const lucro_shopee_input = document.getElementById("valor_lucro_shopee_input"); // input onde o lucro será exibido
    const lucro_fisico_input = document.getElementById("valor_lucro_fisico_input"); // input onde o lucro será exibido
    const lucro_misto_shopee_input = document.getElementById("valor_lucro_misto_shopee_input"); 
    const lucro_misto_fisico_input = document.getElementById("valor_lucro_misto_fixo_input");

    // Converte valores para float
    let preco_venda_final = parseFloat(preco_venda.value.replace(",", ".")) || 0;
    let percentual_shopee_final = parseFloat(percentual_shopee.value.replace(",", ".")) || 0;
    let custo_insumo_final = parseFloat(custo_insumos.value.replace(",", ".")) || 0;

    // Calcula lucro
    let lucro_shopee = preco_venda_final - (preco_venda_final * (percentual_shopee_final / 100)) - custo_insumo_final;
    let lucro_fisico = preco_venda_final - custo_insumo_final;

    function mostra_lucro_fisica() {
        if (lucro_fisico_input) lucro_fisico_input.value = lucro_fisico.toFixed(2);
    }

    function mostra_lucro_shopee() {
        if (lucro_shopee_input) lucro_shopee_input.value = lucro_shopee.toFixed(2);
    }

    function mostra_lucro_misto() {
        if (lucro_misto_shopee_input) lucro_misto_shopee_input.value = `R$ ${lucro_shopee.toFixed(2)}`;
        if (lucro_misto_fisico_input) lucro_misto_fisico_input.value = `R$ ${lucro_fisico.toFixed(2)}`;
    }

    switch (select_tipo_venda) {
        case "vazio":
            console.log("Escolha Vazia");
            break;

        case "venda_shopee":
            mostra_lucro_shopee();
            break;

        case "venda_fisica":
            mostra_lucro_fisica();
            break;

        default:
            mostra_lucro_misto();
            break;
    }
}

// Quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    atualizar_select_categorias();
});

// Quando abrir o modal de cadastro de categorias
document.getElementById("modal_cadastro_categorias_produtos").addEventListener("show.bs.modal", () => {
    carregar_categorias_modal();
});

// Carrega categorias no modal
function carregar_categorias_modal() {
    const container = document.getElementById("categoria_produtos_cadastro_container");
    container.innerHTML = "";

    lista_categorias_produtos.forEach((categoria, index) => {
        inserir_input_cadastro_categoria(index + 1, categoria, true);
    });

    // Sempre um input vazio extra
    inserir_input_cadastro_categoria(lista_categorias_produtos.length + 1, "", false);
}


    window.onload = () => {
        carregar_categorias_modal();
        atualizar_select_categorias();
        atualizar_tabela_produtos();
    };

    // === CATEGORIAS ===
    function carregar_categorias_modal() {
        atualizar_select_categorias();
    }

    function atualizar_select_categorias() {
        const select = document.getElementById("select_categorias_produtos");
        if (!select) return;
        select.innerHTML = "";

        lista_categorias_produtos.forEach((cat, index) => {
            const opt = document.createElement("option");
            opt.value = index;
            opt.textContent = cat;
            select.appendChild(opt);
        });
    }

    function inserir_input_cadastro_categoria(indice = lista_categorias_produtos.length + 1, valor = "", bloqueado = false) {
        const container = document.getElementById("categoria_produtos_cadastro_container");
        const html = `
            <div class="row" id="row_categoria_${indice}">
                <div class="input-group mt-2">
                    <span class="input-group-text">
                        <i class="fa-solid fa-list"></i>
                    </span>
                    <input type="text" class="form-control" 
                        id="categoriaproduto_0${indice}"
                        placeholder="Digite a categoria ${indice}"
                        value="${valor}" ${bloqueado ? "disabled" : ""}>
                    <button class="btn btn-success input-group-text"
                        onclick="salvar_categoria_produto(${indice})">
                        <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button class="btn btn-primary input-group-text"
                        onclick="editar_categoria_produto(${indice})">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn btn-danger input-group-text"
                        onclick="excluir_categoria_produto(${indice})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
    }

    function salvar_categoria_produto(indice) {
        const input_categoria = document.getElementById(`categoriaproduto_0${indice}`);
        if (!input_categoria || input_categoria.value.trim() === "") {
            alert("Digite uma categoria antes de salvar!");
            return;
        }

        lista_categorias_produtos.push(input_categoria.value.trim());
        localStorage.setItem("categorias", JSON.stringify(lista_categorias_produtos));
        input_categoria.disabled = true;

        atualizar_select_categorias();
        inserir_input_cadastro_categoria();
    }

    function editar_categoria_produto(indice) {
        const input_categoria = document.getElementById(`categoriaproduto_0${indice}`);
        if (input_categoria) {
            input_categoria.disabled = false;
        }
    }

    function excluir_categoria_produto(indice) {
        lista_categorias_produtos.splice(indice - 1, 1);
        localStorage.setItem("categorias", JSON.stringify(lista_categorias_produtos));

        const row = document.getElementById(`row_categoria_${indice}`);
        if (row) row.remove();

        atualizar_select_categorias();
    }

    // === PRODUTOS ===
    function salvar_produto() {
        const codigo = document.getElementById("codigo_produto").value.trim();
        const nome = document.getElementById("nome_produto").value.trim();
        const categoriaSelect = document.getElementById("select_categorias_produtos");
        const categoria = categoriaSelect ? categoriaSelect.options[categoriaSelect.selectedIndex].text : "";
        const custoInsumos = parseFloat(document.getElementById("valor_insumo_input").value) || 0;
        const precoVenda = parseFloat(document.getElementById("valor_venda_input").value) || 0;
        const localVenda = document.getElementById("select_tipo_venda").value;
        const lucro = calcularLucro(custoInsumos, precoVenda);

        if (!codigo || !nome || !categoria) {
            alert("Preencha todos os campos obrigatórios (Código, Nome, Categoria).");
            return;
        }

        const novoProduto = {
            codigo,
            nome,
            categoria,
            custo_insumos: custoInsumos,
            preco_venda: precoVenda,
            local_venda: localVenda,
            lucro
        };

        lista_produtos.push(novoProduto);
        localStorage.setItem("produtos", JSON.stringify(lista_produtos));

        limpar_dados_produtos();
        atualizar_tabela_produtos();
    }

    function limpar_dados_produtos() {
        document.getElementById("codigo_produto").value = "";
        document.getElementById("nome_produto").value = "";
        document.getElementById("valor_insumo_input").value = 0;
        document.getElementById("valor_venda_input").value = 0;
        document.getElementById("select_tipo_venda").value = "vazio";
    }

    function atualizar_tabela_produtos() {
        const tbody = document.getElementById("body-tabela-produtos");
        tbody.innerHTML = "";

        lista_produtos.forEach((produto) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${produto.custo_insumos.toFixed(2)}</td>
                <td>R$ ${produto.preco_venda.toFixed(2)}</td>
                <td>${produto.local_venda}</td>
                <td>R$ ${produto.lucro.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // === SUA FUNÇÃO DE LUCRO EXISTENTE ===
    function calcularLucro(custo, venda) {
        return venda - custo;
    }
