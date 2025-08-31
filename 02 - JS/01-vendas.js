function configura_tipo_input(){
    var filtro = document.getElementById("filtroPesquisa").value;
    var input = document.getElementById("input_pesquisa_vendas");
    if (filtro === "data") {
        input.type = "date";
    } else {
        input.type = "text";
    }
}
function icon_filtro() {
    var filtro = document.getElementById("filtroPesquisa").value;
    var icon = document.getElementById("icon-filtro-pesquisa");
    var input_tamanho = document.getElementById("input_tamanho");
    var input_pesquisa_vendas = document.getElementById("input_pesquisa_vendas");

    if (filtro === "data") {
        icon.className = "fa fa-solid fa-calendar";
        input_tamanho.className = "col-3";
        input_pesquisa_vendas.type = "date";
        configura_tipo_input();
    } else if (filtro === "id_venda") {
        icon.className = "fa fa-solid fa-hashtag";
        input_tamanho.className = "col-4";
        input_pesquisa_vendas.type = "text";
        document.getElementById("input_pesquisa_vendas").placeholder = "Digite o ID da Venda";

        configura_tipo_input();
    } else if (filtro === "cliente") {
        icon.className = "fa fa-solid fa-user";
        input_tamanho.className = "col-4";
        input_pesquisa_vendas.type = "text";
        document.getElementById("input_pesquisa_vendas").placeholder = "Digite o Nome do Cliente";
        configura_tipo_input();
    }
}