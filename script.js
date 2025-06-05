document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Logique pour le menu hamburger
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });
    }

    // Logique pour le mode clair/sombre
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Appliquer le mode enregistré au chargement de la page
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️'; // Icône soleil en mode sombre
        }
    } else {
        if (darkModeToggle) {
            darkModeToggle.textContent = '🌙'; // Icône lune en mode clair
        }
    }

    // Écouteur d'événement pour le clic sur le bouton de mode sombre
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode'); // Bascule la classe 'dark-mode'

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark'); // Enregistrer la préférence
                darkModeToggle.textContent = '☀️'; // Mettre à jour l'icône
            } else {
                localStorage.setItem('theme', 'light'); // Enregistrer la préférence
                darkModeToggle.textContent = '🌙'; // Mettre à jour l'icône
            }
        });
    }
});