## Trouver une librairie graphique pour les réseaux

- Librairie javascript ;
- Si possible utilisable avec Angular ;
- Possibilité de déplacer les noeuds ;
- Possibilité d'ajouter ou de supprimer des noeuds dynamiquement ;
- Possibilité de changer le style du noeud et d'ajouter ses propres images ;
- Possibilité de faire des liens directionnels ;
- Mettre en surbrillances les noeuds associées plus ou moins directement à un noeud au survol ou au clic ;  
- Gratuite ;

# Cahier des Charges

## 1. Affichage Graphique en Réseau
- **Type de graphique** : Graphique en réseau (noeuds et arrêtes).
- **Noeuds** :
  - Un noeud par personnage.
- **Arrêtes** :
  - Une arrête entre deux noeuds représente la nature du lien entre eux (ex: frère de, enfant de, ...).
  - Le label du lien doit être affiché.
  - Les arrêtes peuvent être bidirectionnelles ou unidirectionnelles.
- **Zoom** :
  - Possibilité de zoomer et dézoomer sur le graphique.

## 2. Informations sur les Personnages
Chaque personnage peut posséder les informations suivantes :
- **Fiche personnage** : Brève description.
- **Lien externe** : Lien vers la fiche wiki.
- **Genre** : Féminin ou masculin.
- **Lieu de résidence**.
- **Apparitions** : Liste des chapitres de l'EMV où le personnage apparaît.
- **Autres informations** : Nationalité, religion, caste, etc.

## 3. Interaction avec le Graphique
- **Recherche** :
  - Possibilité de rechercher un personnage via un sélecteur.
  - Mise à jour du graphique en fonction de la recherche.
- **Clic sur Noeud** :
  - Affichage des noeuds adjacents proches (1-5 liens).
- **Personnalisation** :
  - Possibilité de personnaliser les noeuds en ajoutant des images.

## 4. Filtrage du Graphique
Possibilité de filtrer le graphique et donc la liste des noeuds en fonction de :
- **Genre** : Homme / Femme.
- **Statut** : Personnes guéries, etc.
- **Chapitre de l'EMV** : Un ou plusieurs chapitres, ou section (ex: "Vie cachée").
- **Lieu de résidence** : Ou zone plus large.

## 5. Tableau des Personnages
- **Affichage** : Afficher la liste des personnages depuis un tableau.
- **Fonctionnalités** : Filtres et tri sur le tableau.
