document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Votre logique existante pour le menu hamburger
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });
    }

    // --- NOUVEAU : LOGIQUE DU MODE CLAIR/SOMBE ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // 1. Appliquer le mode enregistré au chargement de la page
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        // Change l'icône du bouton en soleil pour indiquer qu'on est en mode sombre
        if (darkModeToggle) { // Vérifie que le bouton existe avant de modifier son texte
            darkModeToggle.textContent = '☀️';
        }
    } else {
        // Si aucun mode n'est enregistré ou si c'est 'light', on reste en mode clair
        // et on affiche la lune pour basculer vers le sombre
        if (darkModeToggle) { // Vérifie que le bouton existe avant de modifier son texte
            darkModeToggle.textContent = '🌙';
        }
    }

    // 2. Écouteur d'événement pour le clic sur le bouton
    if (darkModeToggle) { // Vérifie que le bouton existe avant d'ajouter l'écouteur
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode'); // Bascule la classe 'dark-mode' sur le body

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark'); // Enregistre la préférence en 'dark'
                darkModeToggle.textContent = '☀️'; // Change l'icône en soleil
            } else {
                localStorage.setItem('theme', 'light'); // Enregistre la préférence en 'light'
                darkModeToggle.textContent = '🌙'; // Change l'icône en lune
            }
        });
    }
    // --- FIN LOGIQUE DU MODE CLAIR/SOMBE ---
});