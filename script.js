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
