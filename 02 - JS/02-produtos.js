const cadastros_insumos_fixos_PRODUTOS = []
const cadastro_cod_insumos_fixos_PRODUTOS = []
const lista_produtos = []

document.addEventListener("DOMContentLoaded", function() {
    custo_nao_sabe();
});

//ABRE O MODAL ASSIM QUE A PAGINA CARREGA
window.onload = function gerar_codigo_insumo_fixo(){
    const tam_lista_insumos_fixo = cadastro_cod_insumos_fixos_PRODUTOS.length;
    codigo_insumo_fixo.value = tam_lista_insumos_fixo; 
}

//VARIAVEIS DECLARADAS
var codigo_insumo_fixo = document.getElementById('codigo_insumo_fixo');
var nome_insumo_fixo = document.getElementById('nome_insumo_fixo');
var valor_insumo_fixo = document.getElementById('valor_insumo_fixo');
var dias_insumo_fixo = document.getElementById('dias_insumo_fixo');
var minutos_insumo_fixo = document.getElementById('minutos_insumo_fixo');
var codigo_produto = document.getElementById("codigo_produto");
var close_modal_cadastro_produto = document.getElementById("close-modal-cadastro-produto");

//ATUALIZA O CAMPO DE CODIGO DE PRODUTO AUTOMATICAMENTE
function atualiza_codigo_produto(){
    codigo_produto.value = `PROD_${lista_produtos.length+1}`
}

//CALCULA OS MINUTOS NOS INSUMOS FIXOS
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

//SALVA O CADASTRO DE INSUMOS FIXOS
function salvar_insumos_fixos(){
const novo_insumo = {
    codigo_insumo_fx : codigo_insumo_fixo.value,
    nome_insumo_fx : nome_insumo_fixo.value,
    valor_insumo_fx : valor_insumo_fixo.value,
    dias_insumo_fx : dias_insumo_fixo.value,
    minutos_insumo_fx : minutos_insumo_fixo.value,
}

//SALVA O OBJETO NO ARRAY DE INSUMOS FIXOS
cadastros_insumos_fixos_PRODUTOS.push(novo_insumo);
codigo_insumo_fixo.disabled = true;
nome_insumo_fixo.disabled = true;
valor_insumo_fixo.disabled = true;
dias_insumo_fixo.disabled = true;
minutos_insumo_fixo.disabled = true;
}

//MUDAR O ICONE DO FILTRO DE PESQUISA
function seleciona_filtro_busca_produtos() {
    var filtro = document.getElementById("filtroPesquisa").value;
    var inputPesquisa = document.getElementById("searchInput");
    var iconFiltro = document.getElementById("icon-filtro-pesquisa");

    // Define ícone e placeholder
    function avalia_coluna_produtos() {
        if (filtro === "codigo") {
            iconFiltro.className = "fa fa-solid fa-barcode";
            inputPesquisa.placeholder = "Digite o Código do Produto";
        } else if (filtro === "categoria") {
            iconFiltro.className = "fa fa-solid fa-folder";
            inputPesquisa.placeholder = "Digite a Categoria do Produto";
        } else {
            iconFiltro.className = "fa fa-solid fa-tag";
            inputPesquisa.placeholder = "Digite o Nome do Produto";
        }
    }

    // Chama a função
    avalia_coluna_produtos();
}

function mostra_codigo_insumo_nao_sabe(i){
    document.getElementById(`codigo_insumo_naosabe_${i}`).value = cadastro_cod_insumos_fixos_PRODUTOS[i] || "";
}

// ABRE MODAL PARA CALCULAR CUSTO DE INSUMO QUANDO NAO SABE
// ABRE MODAL PARA CALCULAR CUSTO DE INSUMO QUANDO NAO SABE
function custo_nao_sabe() {
    // Carrega a lista de insumos variáveis do localStorage
    const lista_insumos_variaveis = JSON.parse(localStorage.getItem("lista_insumos")) || [];
    
    // desabilita o input de custo
    var input = document.getElementById("valor_insumo_input");
    input.disabled = true;

    // abre o modal
    const modalEl = document.getElementById('modal-insumo-produto');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    // fecha o modal de cadastro de produtos
    document.getElementById("close-modal-cadastro-produto").click();

    const modalBodyListaInsumoNaoSei = document.getElementById("modal-body-lista-insumos-nao-sei");
    modalBodyListaInsumoNaoSei.innerHTML = ""; // 🔥 limpa antes de recriar

    // Itera sobre a lista de insumos variáveis para criar os inputs
    for (let i = 0; i < lista_insumos_variaveis.length; i++) {
        const insumo = lista_insumos_variaveis[i];
        
        modalBodyListaInsumoNaoSei.innerHTML += `
        <div class="row">
            <div class="col-2">
                <input type="text" class="form-control" 
                       value="${insumo.codigo}" disabled>
            </div>
            <div class="col-4">
                <input type="text" class="form-control" 
                       value="${insumo.nome}" disabled>
            </div>
            <div class="col-2">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">R$</span>
                    </div>
                    <input type="text" class="form-control"
                           id="preco_unitario_naosabe_${i}"
                           value="${insumo.preco_unitario}"
                           disabled>
                </div>
            </div>
            <div class="col-2">
                <input type="number" class="form-control" 
                       id="qtd_insumo_naosabe_${i}" 
                       min="0"
                       oninput="calcularTotal(${i})">
            </div>
            <div class="col-2">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">R$</span>
                    </div>
                    <input type="text" class="form-control"
                           id="preco_total_insumo_naosabe_${i}" disabled>
                </div>
            </div>
        </div>`;
    }
}

// NOVO CÓDIGO: Função para calcular o total de cada item
function calcularTotal(index) {
    // Pega os elementos usando o índice
    const precoUnitarioInput = document.getElementById(`preco_unitario_naosabe_${index}`);
    const qtdInput = document.getElementById(`qtd_insumo_naosabe_${index}`);
    const precoTotalInput = document.getElementById(`preco_total_insumo_naosabe_${index}`);

    // Converte os valores para números (usando 0 se estiverem vazios)
    const precoUnitario = parseFloat(precoUnitarioInput.value) || 0;
    const quantidade = parseInt(qtdInput.value) || 0;

    // Calcula o total
    const total = (precoUnitario * quantidade).toFixed(2);

    // Atualiza o campo de preço total
    precoTotalInput.value = total;
}

function reabrir_modal_cadastro_insumo(){
    document.getElementById("button-cadastro-novo-produto").click();
}

function adicionarInsumoFixo() {
    let container = document.getElementById("card-insumo-fixo");

    // pega o primeiro bloco como "modelo"
    let bloco = container.querySelector(".bloco-insumo");

    // clona o bloco inteiro (true = clona filhos também)
    let novoBloco = bloco.cloneNode(true);

    // limpa os inputs do clone
    novoBloco.querySelectorAll("input").forEach(input => input.value = "");

    // adiciona no container
    container.appendChild(novoBloco);
}
