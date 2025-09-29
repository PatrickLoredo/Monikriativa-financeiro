const sub_lista_insumos_codigo = [];
const sub_lista_insumos_nome = [];
const sub_lista_insumos_custo_total = [];
const sub_lista_insumos_dias_trabalho = [];
const sub_lista_insumos_custo_minuto = [];

const lista_insumos_fixos = [
    sub_lista_insumos_codigo,
    sub_lista_insumos_nome,
    sub_lista_insumos_custo_total,
    sub_lista_insumos_dias_trabalho,
    sub_lista_insumos_custo_minuto
];

const container_insumos_fixos = document.getElementById("container-insumos-fixos");
const horas_trabalhadas = 8;

function salvarLocalStorage() {
    localStorage.setItem("lista_insumos_fixos", JSON.stringify(lista_insumos_fixos));
}

function carregarLocalStorage() {
    const data = localStorage.getItem("lista_insumos_fixos");
    if (data) {
        const dados = JSON.parse(data);

        sub_lista_insumos_codigo.push(...dados[0]);
        sub_lista_insumos_nome.push(...dados[1]);
        sub_lista_insumos_custo_total.push(...dados[2]);
        sub_lista_insumos_dias_trabalho.push(...dados[3]);
        sub_lista_insumos_custo_minuto.push(...dados[4]);

        for (let i = 0; i < sub_lista_insumos_codigo.length; i++) {
            inserir_insumos_fixos(true, i);
        }
    } else {
        inserir_insumos_fixos(false, 0);
    }
}

function inserir_insumos_fixos(carregar = false, index = null) {
    const linhaIndex = carregar ? index + 1 : sub_lista_insumos_codigo.length + 1;

    const novoHTML = `
        <div class="row text-center insumo-fixo-linha" id="linha_insumo_${linhaIndex}">
            <div class="row my-1">
                <div class="col-2">
                    <input type="text" class="form-control text-center codigo_insumo_fixo" id="codigo_insumo_fixo_${linhaIndex}" value="INSM_FX_${linhaIndex}" disabled>
                </div>
                <div class="col-3 text-center">
                    <input type="text" class="form-control nome_insumo_fixo text-center" id="nome_insumo_fixo_${linhaIndex}" placeholder="Digite o nome do Insumo ${linhaIndex}">
                </div>
                <div class="col-2">
                    <div class="input-group">
                        <i class="fa fa-dollar-sign input-group-text"></i>
                        <input type="number" class="form-control valor_insumo_fixo text-center" id="valor_total_insumo_fixo_${linhaIndex}" onkeyup="calcular_minutos(${linhaIndex})">
                    </div>
                </div>
                <div class="col-1">
                    <input type="number" class="form-control dias_insumo_fixo" id="qtd_dias_insumos_fixos_${linhaIndex}" value="22" onkeyup="calcular_minutos(${linhaIndex})">
                </div>
                <div class="col-2">
                    <div class="input-group">
                        <i class="fa fa-dollar-sign input-group-text"></i>
                        <input type="text" id="custo_minuto_insumo_fixo_${linhaIndex}" class="form-control minutos_insumo_fixo" disabled>
                    </div>
                </div>
                <div class="col-2">
                    <div>
                        <button class="btn btn-success" onclick="salvar_insumos_fixos(${linhaIndex})"><i class="fa-solid fa-floppy-disk"></i></button>
                        <button class="btn btn-warning text-white" onclick="editar_linha(${linhaIndex})"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-danger" onclick="remover_linha(${linhaIndex})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        
    `;
    console.log(lista_insumos_fixos)
    container_insumos_fixos.insertAdjacentHTML("beforeend", novoHTML);

    if (carregar) {
        document.getElementById(`nome_insumo_fixo_${linhaIndex}`).value = sub_lista_insumos_nome[index];
        document.getElementById(`valor_total_insumo_fixo_${linhaIndex}`).value = sub_lista_insumos_custo_total[index];
        document.getElementById(`qtd_dias_insumos_fixos_${linhaIndex}`).value = sub_lista_insumos_dias_trabalho[index];
        document.getElementById(`custo_minuto_insumo_fixo_${linhaIndex}`).value = sub_lista_insumos_custo_minuto[index];

        document.getElementById(`nome_insumo_fixo_${linhaIndex}`).disabled = true;
        document.getElementById(`valor_total_insumo_fixo_${linhaIndex}`).disabled = true;
        document.getElementById(`qtd_dias_insumos_fixos_${linhaIndex}`).disabled = true;
    }
}

function calcular_minutos(index) {
    const total_dias = parseFloat(document.getElementById(`qtd_dias_insumos_fixos_${index}`).value) || 0;
    const custo_total_produto = parseFloat(document.getElementById(`valor_total_insumo_fixo_${index}`).value) || 0;
    const minutos_dia = 60 * horas_trabalhadas;
    const minutos_mes = minutos_dia * total_dias;
    const custo_minutos = minutos_mes > 0 ? (custo_total_produto / minutos_mes).toFixed(2) : 0;
    document.getElementById(`custo_minuto_insumo_fixo_${index}`).value = custo_minutos;
}

function salvar_insumos_fixos(index) {
    const codigo = document.getElementById(`codigo_insumo_fixo_${index}`).value;
    const nome = document.getElementById(`nome_insumo_fixo_${index}`).value;
    const custo_total = parseFloat(document.getElementById(`valor_total_insumo_fixo_${index}`).value) || 0;
    const dias_trabalho = parseInt(document.getElementById(`qtd_dias_insumos_fixos_${index}`).value) || 0;
    const custo_minuto = parseFloat(document.getElementById(`custo_minuto_insumo_fixo_${index}`).value) || 0;

    // Verificar duplicatas
    const codigoIndex = sub_lista_insumos_codigo.indexOf(codigo);
    const nomeIndex = sub_lista_insumos_nome.indexOf(nome);

    if (codigoIndex !== -1 && codigoIndex !== index - 1) {
        alert(`O código "${codigo}" já foi cadastrado anteriormente.`);
        return;
    }

    if (nomeIndex !== -1 && nomeIndex !== index - 1) {
        alert(`O nome "${nome}" já foi cadastrado anteriormente.`);
        return;
    }

    sub_lista_insumos_codigo[index - 1] = codigo;
    sub_lista_insumos_nome[index - 1] = nome;
    sub_lista_insumos_custo_total[index - 1] = custo_total;
    sub_lista_insumos_dias_trabalho[index - 1] = dias_trabalho;
    sub_lista_insumos_custo_minuto[index - 1] = custo_minuto;

    salvarLocalStorage();

    // Bloquear campos
    document.getElementById(`nome_insumo_fixo_${index}`).disabled = true;
    document.getElementById(`valor_total_insumo_fixo_${index}`).disabled = true;
    document.getElementById(`qtd_dias_insumos_fixos_${index}`).disabled = true;
    document.getElementById(`custo_minuto_insumo_fixo_${index}`).disabled = true;

    // Só criar nova linha se estivermos salvando o último item
    if (index === sub_lista_insumos_codigo.length) {
        inserir_insumos_fixos(false);
    }
}


function remover_linha(index) {
    if (index === 1) {
        alert("Não é possível remover a linha inicial de cadastro.\nTente apenas limpar os dados errados.");
        return;
    }

    const linha = document.getElementById(`linha_insumo_${index}`);
    if (linha) {
        linha.remove();
        sub_lista_insumos_codigo.splice(index - 1, 1);
        sub_lista_insumos_nome.splice(index - 1, 1);
        sub_lista_insumos_custo_total.splice(index - 1, 1);
        sub_lista_insumos_dias_trabalho.splice(index - 1, 1);
        sub_lista_insumos_custo_minuto.splice(index - 1, 1);

        salvarLocalStorage();

        // Reconstruir todas as linhas para corrigir índices
        container_insumos_fixos.innerHTML = "";
        sub_lista_insumos_codigo.forEach((_, i) => {
            inserir_insumos_fixos(true, i);
        });
    }
}


function editar_linha(index) {
    document.getElementById(`nome_insumo_fixo_${index}`).disabled = false;
    document.getElementById(`valor_total_insumo_fixo_${index}`).disabled = false;
    document.getElementById(`qtd_dias_insumos_fixos_${index}`).disabled = false;
}

document.addEventListener("DOMContentLoaded", carregarLocalStorage);
