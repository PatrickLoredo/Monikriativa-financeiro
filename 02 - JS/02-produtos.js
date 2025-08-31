const cadastros_insumos_fixos = []

var nome_insumo_fixo = document.getElementById('nome_insumo_fixo');
var valor_insumo_fixo = document.getElementById('valor_insumo_fixo');
var dias_insumo_fixo = document.getElementById('dias_insumo_fixo');
var minutos_insumo_fixo = document.getElementById('minutos_insumo_fixo');

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

function salvar_insumos_fixos(){
const novo_insumo = {
    nome_insumo_fx : nome_insumo_fixo.value,
    valor_insumo_fx : valor_insumo_fixo.value,
    dias_insumo_fx : dias_insumo_fixo.value,
    minutos_insumo_fx : minutos_insumo_fixo.value,
}

cadastros_insumos_fixos.push(novo_insumo);

nome_insumo_fixo.disabled = true;
valor_insumo_fixo.disabled = true;
dias_insumo_fixo.disabled = true;
minutos_insumo_fixo.disabled = true;
}


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
function custo_nao_sabe() {
    var input = document.getElementById("valor_insumo_input");
    input.disabled = true;

    function abre_modal_calculo_custo(){
        
    }
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
