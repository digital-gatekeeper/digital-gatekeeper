Backend : Symfony
Backdoor: NodeJs
Frontend: Svelte

Porte pouvant être déverrouillée avec le téléphone
Différentes façon d'ouvrir
- avec le téléphone via l'appli
- NFC
- clé
- empreinte digitale

## Backend

### Fonctionnalités
- L’hôtel doit ajouter l'utilisateur avec le numéro de téléphone
- Le compte de l'utilisateur sera associé à la porte de la chambre
- Restreindre le nombre d'utilisateurs au nombre de place dans la chambre
- L'utilisateur doit avoir un compte utilisateur
- Si l'utilisateur n'a pas de compte, un mail est envoyé pour l'inviter à créer un compte

### Système de notifications
- Avertir quand la porte ne pourra plus être ouverte
- Quand l'utilisateur pourra avoir accès à la porte

### Base de données
- Gestion des rôles
- Gestion des hôtels
- Gestion des clients
- Gestion des logs

### todo
- Faire les fixture

## Backdoor
- IPV6 pour l'identification de la porte
- Activer ouverture et fermeture de la porte
- Gestion des logs de la porte
    - Puis synchro avec backend
    - Qui a ouvert la porte, quand et comment

## Frontend

#### Utilisateur
- Page de connexion au compte
- Page d'ouverture de la porte
- Page d'ajout de compte autorisés
- Page de paramètres
    - désactiver les notifications
- Page de paramètres pour l'ouverture de la porte
    - type d'ouverture
- Accès au logs de la porte 
    - savoir si un membre du staff est passé

#### Hotels
- Dashboard
- CRUD Formulaire d'ajout d'utilisateur pour une porte
- CRUD Formulaire d'ajout d'une porte
    - Sélectionner les méthodes d'ouvertures de la porte
    - horaire / date pour la gestion d'une porte
- Accès aux logs
- CRUD membres du staff
    - Gestion des rôles