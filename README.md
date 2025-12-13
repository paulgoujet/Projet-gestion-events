# Application de gestion d'événements

## Fonctionnalités principales

### Utilisateurs (USER)
- Inscription et connexion
- Consultation des événements publiés
- Accès au détail d’un événement
- Inscription à un événement
- Désinscription d’un événement
- Page **Mes inscriptions** (uniquement ses propres données)

### Administrateurs (ADMIN)
- Accès à une interface d’administration protégée
- Création d’événements
- Suppression d’événements
- Paramétrage des événements :
  - titre
  - description
  - dates
  - capacité
  - catégorie
  - lieu
  - image (URL)
  - statut (brouillon / publié)

### Sécurité et gestion des rôles
- Authentification par JWT
- Deux rôles implémentés :
  - USER
  - ADMIN
- Droits strictement appliqués :
  - un utilisateur ne peut accéder qu’à ses propres inscriptions
  - seules les routes administrateur permettent la création et la suppression d’événements
- Les mots de passe sont hashés avec bcrypt

### API & données
- API RESTful
- Routes organisées par ressources
- Middlewares de sécurité (authentification et rôles)
- Entités principales :
  - events
  - categories
  - locations (lieux des événements stockés dans la base de données)
- Table de relation :
  - registrations (inscriptions aux événements)

### Frontend (React)
- Interface développée avec React
- Navigation avec React Router
- Gestion de l’authentification via Context API
- Interface adaptée selon le rôle (USER / ADMIN)
- Composant générique réutilisable :
  - EventCard
    - utilisé pour afficher les événements sous forme de cartes
    - réutilisé dans la liste d’événements
    - inspiré d'une carte créée par Reactbits.dev

## Technologies utilisées

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- MySQL
- jsonwebtoken
- bcryptjs

## Procédure de lancement en local

### Prérequis
- Node.js
- npm
- MySQL

### Installation backend
#### Aller dans le dossier backend
  - cd backend
#### Installer les dépendances
  - npm install
#### Configuration du fichier .env
  - Créer un fichier .env à la racine du dossier backend
#### Renseigner les variables suivantes :
  - PORT=5000
  - DB_HOST=localhost
  - DB_USER=your_user
  - DB_PASSWORD=your_password
  - DB_NAME=eventmanager
  - JWT_SECRET=your_secret

### Lancer le serveur
#### Démarrer le backend
- npm run dev
- API disponible sur :
- http://localhost:5000

### Lancement du frontend
#### Aller dans le dossier frontend
- cd frontend/client
#### Installer les dépendances
- npm install
### Lancer le serveur Vite
- npm run dev

### Base de données
- Base MySQL créée localement
- Contenu de la base non versionné
