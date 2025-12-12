/* FICHIER: script.js */

// Clé de sauvegarde unique
const KEY_CANDIDATURES = 'estia_housing_favoris';

// 1. FONCTION : AJOUTER AUX FAVORIS (Candidater)
function ajouterAuxFavoris(titre, prix, lieu, image) {
    // Récupérer la liste actuelle
    let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];

    // Vérifier si déjà présent
    let existe = liste.some(item => item.titre === titre);
    
    if (existe) {
        alert("⚠️ Vous avez déjà candidaté à ce logement !");
    } else {
        // Ajouter
        liste.push({ titre: titre, prix: prix, lieu: lieu, image: image });
        localStorage.setItem(KEY_CANDIDATURES, JSON.stringify(liste));
        
        // Confirmation simple et efficace
        alert("✅ Candidature ajoutée dans l'onglet 'Favoris' !");
    }
}

// 2. FONCTION : AFFICHER LES FAVORIS (Sur la page favoris.html)
function afficherFavoris() {
    const container = document.getElementById('listeFavoris');
    const messageVide = document.getElementById('messageVide');

    // Si on n'est pas sur la page favoris, on arrête
    if (!container) return;

    // Récupérer les données
    let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];

    container.innerHTML = ""; // Vider

    if (liste.length === 0) {
        messageVide.style.display = 'block';
    } else {
        messageVide.style.display = 'none';

        // Générer le HTML pour chaque favori
        liste.forEach((item, index) => {
            let card = `
                <div class="card">
                    <img src="${item.image}" alt="${item.titre}">
                    <div class="card-content">
                        <h3>${item.titre}</h3>
                        <span class="location">📍 ${item.lieu}</span>
                        <p class="price">${item.prix}</p>
                        <div style="background:#e8f5e9; color:#155724; padding:5px; margin:10px 0; border-radius:5px; text-align:center; font-weight:bold;">
                            ✔ Dossier Transmis
                        </div>
                        <button class="delete-btn" onclick="supprimerFavori(${index})">Retirer de la liste</button>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }
}

// 3. FONCTION : SUPPRIMER UN FAVORI
function supprimerFavori(index) {
    if(confirm("Supprimer cette candidature ?")) {
        let liste = JSON.parse(localStorage.getItem(KEY_CANDIDATURES)) || [];
        liste.splice(index, 1); // Retirer l'élément
        localStorage.setItem(KEY_CANDIDATURES, JSON.stringify(liste));
        afficherFavoris(); // Recharger la zone
    }
}

// 4. FONCTION : GESTION DU PROFIL (L'ancien code qui marchait)
function initProfil() {
    const btn = document.getElementById('btnProfil');
    const card = document.getElementById('cardDossier');
    const badge = document.getElementById('badgeStatus');

    if(!btn) return;

    let verrouille = false;

    btn.addEventListener('click', function() {
        if(!verrouille) {
            // Verrouiller
            card.classList.add('readonly-mode');
            btn.textContent = "Modifier mon profil";
            btn.style.backgroundColor = "#ff8c00";
            if(badge) { badge.textContent = "Dossier Validé ✔"; badge.className = "status-badge status-validated"; }
            alert("Votre dossier est validé !");
            verrouille = true;
        } else {
            // Déverrouiller
            card.classList.remove('readonly-mode');
            btn.textContent = "Enregistrer mon dossier";
            btn.style.backgroundColor = "#28a745";
            if(badge) { badge.textContent = "Mode Édition ✎"; badge.className = "status-badge status-editing"; }
            verrouille = false;
        }
    });
}

// Lancement automatique au chargement
document.addEventListener('DOMContentLoaded', function() {
    afficherFavoris();
    initProfil();
});
