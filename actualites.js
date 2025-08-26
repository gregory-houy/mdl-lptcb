// actualites.js

// 1. Initialisation du client Supabase
// Remplacez les valeurs suivantes par vos propres clés Supabase
const SUPABASE_URL = "https://iarukjyswplvmtcxjtbx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhcnVranlzd3Bsdm10Y3hqdGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTYwMjUsImV4cCI6MjA3MTYzMjAyNX0.jC33JZm5vwOROpxEMBCRQTaGwe-TF06fRMHg1UcoHxY";

// La ligne corrigée : on utilise window.supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Fonction pour récupérer les actualités
async function fetchActualites() {
      try {
            const { data, error } = await supabase
                  .from('actualites')
                  .select('*')
                  .order('date_publication', { ascending: false });

            if (error) {
                  throw error;
            }
            
            renderActualites(data);

      } catch (error) {
            console.error('Erreur lors de la récupération des actualités :', error.message);
            const container = document.querySelector('.container');
            container.innerHTML = `<p style="color: red; text-align: center;">Impossible de charger les actualités. Veuillez réessayer plus tard.</p>`;
      }
}

// 3. Fonction pour afficher les actualités sur la page
function renderActualites(actualites) {
      const actualitesContainer = document.querySelector('.container');

      if (actualites.length === 0) {
            actualitesContainer.innerHTML += `<p>Aucune actualité n'est disponible pour le moment.</p>`;
            return;
      }

      actualites.forEach(actualite => {
            const article = document.createElement('article');
            article.className = 'news-item';

            const img = document.createElement('img');

            // 🚨 Ligne corrigée : On utilise directement l'URL de la base de données
            img.src = actualite.url_image;

            img.alt = actualite.titre;
            img.className = 'news-image';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'news-content';

            const date = new Date(actualite.date_publication).toLocaleDateString('fr-FR');

            const titleH2 = document.createElement('h2');
            titleH2.textContent = `${date} - ${actualite.titre}`;

            const descriptionP = document.createElement('p');
            descriptionP.textContent = actualite.texte_descriptif;
        
        // AJOUT DU PARAGRAPHE POUR L'AUTEUR
        const auteurP = document.createElement('p');
        auteurP.className = 'news-author';
        auteurP.textContent = `Publié par : ${actualite.auteur || 'Non spécifié'}`;

            contentDiv.appendChild(titleH2);
            contentDiv.appendChild(descriptionP);
        // AJOUT DE L'AUTEUR AU CONTENU
        contentDiv.appendChild(auteurP);
            article.appendChild(img);
            article.appendChild(contentDiv);

            actualitesContainer.appendChild(article);
      });
}

// 4. Exécution
document.addEventListener('DOMContentLoaded', fetchActualites);