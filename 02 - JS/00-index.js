// 00-index.js
window.total_badge = JSON.parse(localStorage.getItem("total_badge")) || [];

// Função para atualizar o badge no HTML
function atualizarBadge() {
    document.getElementById("badge-notificacao").innerText = window.total_badge.length;
}

// Avalia total do badge ao carregar a página
function avaliar_total_badge() {
    if (window.total_badge.length === 0) {
        document.getElementById("badge-notificacao").innerText = 0;
    } else {
        document.getElementById("badge-notificacao").innerText = window.total_badge.length;
    }
}

// Chama ao carregar
document.addEventListener('DOMContentLoaded', function () {
    avaliar_total_badge();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Função para adicionar badge
function muda_badge() {
    window.total_badge.push(window.total_badge.length + 1); // adiciona elemento
    localStorage.setItem("total_badge", JSON.stringify(window.total_badge)); // salva no navegador
    atualizarBadge();
}
