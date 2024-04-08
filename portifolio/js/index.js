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
