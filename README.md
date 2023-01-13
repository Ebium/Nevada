- Installer node avec une version supérieure ou égale à 16.16 -> https://nodejs.org/fr/download/
- Télécharger le zip présent dans la zone de dépôt (moodle)
- Extraire les fichiers du zip, faire la commande **npm install** dans les dossier client, server, dev ou alors lancer le script npm-i.sh si vous possédez un environnement Linux

- Créer un fichier .env dans le dossier client avec les lignes: 

``` 
JWT_SECRET='Z6sqxPOSgUu_2lIF32xAiQ' 
GENERATE_SOURCEMAP=false 
```

- Créer un fichier .env dans le dossier serveur avec les lignes: 

```
MONGO_URI="mongodb+srv://nevadadb:nevadadb@nevadacluster.ynopy0q.mongodb.net/nevadadb?retryWrites=true&w=majority"
JWT_SECRET='Z6sqxPOSgUu_2lIF32xAiQ'
STRIPE_PRIVATE_KEY="sk_test_51LrLO9JE1Vl9aUiyElWtRFhpLB7oDE5YwmL8h1YFgniEhyugNAiUhlFBzg8qLusFLIzchw9SdDF0QFRlKVudQcDB00T9BwLpiT"
```

- Aller dans le dossier dev, et lancer la commande **npm run dev** pour démarrer l'application

- URL de l'application côté client : http://localhost:3000/nevada/
- URL de l'application côté serveur : http://localhost:5050
