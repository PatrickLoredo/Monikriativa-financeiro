// Função para selecionar o filtro de busca
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
