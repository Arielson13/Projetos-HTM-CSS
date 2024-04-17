document.addEventListener('DOMContentLoaded', function() {
    const btnMobile = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    if (btnMobile) {
        btnMobile.addEventListener('click', function() {
            const navList = document.querySelector('.nav-list');
            navList.classList.toggle('active');
            navList.classList.remove('hidden'); // Garante que a lista seja exibida quando o botão é clicado
        });
    }

    // Adicionando evento de clique a cada link da lista de navegação
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const navList = document.querySelector('.nav-list');
            navList.classList.add('hidden');
        });
    });
});

// Função para criar e baixar o PDF
function baixarPDF() {
    // URL do PDF que você quer baixar
    var urlPDF = "/assets/pdf/Arielson Sousa Duarte.pdf";
    
    // Altera o href do link para o URL do PDF
    document.getElementById('downloadLink').href = urlPDF;
}

// Chama a função ao carregar a página
window.onload = baixarPDF;
