// actualites.js

// 1. Initialisation du client Supabase
// Remplacez les valeurs suivantes par vos propres clés Supabase
const SUPABASE_URL = "VOTRE_URL_SUPABASE";
const SUPABASE_ANON_KEY = "VOTRE_CLE_PUBLIQUE_ANON";

const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Fonction pour récupérer les actualités
async function fetchActualites() {
    try {
        // Sélectionne toutes les actualités dans la table 'actualites'
        // et les trie par date de publication de la plus récente à la plus ancienne
        const { data, error } = await supabase
            .from('actualites')
            .select('*')
            .order('date_publication', { ascending: false });

        if (error) {
            throw error;
        }
        
        // 3. Appelle la fonction pour afficher les actualités récupérées
        renderActualites(data);

    } catch (error) {
        console.error('Erreur lors de la récupération des actualités :', error.message);
        const container = document.querySelector('.container');
        container.innerHTML = `<p style="color: red; text-align: center;">Impossible de charger les actualités. Veuillez réessayer plus tard.</p>`;
    }
}

// 4. Fonction pour afficher les actualités sur la page
function renderActualites(actualites) {
    const actualitesContainer = document.querySelector('.container');

    // Vérifie si des actualités ont été trouvées
    if (actualites.length === 0) {
        actualitesContainer.innerHTML += `<p>Aucune actualité n'est disponible pour le moment.</p>`;
        return;
    }

    actualites.forEach(actualite => {
        // Crée un nouvel élément article
        const article = document.createElement('article');
        article.className = 'news-item';

        // Crée l'élément image
        const img = document.createElement('img');
        img.src = actualite.url_image;
        img.alt = actualite.titre;
        img.className = 'news-image';

        // Crée le conteneur pour le contenu
        const contentDiv = document.createElement('div');
        contentDiv.className = 'news-content';

        // Formate la date au format JJ/MM/AAAA
        const date = new Date(actualite.date_publication).toLocaleDateString('fr-FR');
        
        // Crée le titre avec la date
        const titleH2 = document.createElement('h2');
        titleH2.textContent = `${date} - ${actualite.titre}`;

        // Crée le paragraphe de description
        const descriptionP = document.createElement('p');
        descriptionP.textContent = actualite.texte_descriptif;

        // Assemble tous les éléments
        contentDiv.appendChild(titleH2);
        contentDiv.appendChild(descriptionP);
        article.appendChild(img);
        article.appendChild(contentDiv);
        
        // Insère le nouvel article dans le conteneur de la page
        actualitesContainer.appendChild(article);
    });
}

// 5. Exécution : appelle la fonction principale au chargement de la page
document.addEventListener('DOMContentLoaded', fetchActualites);