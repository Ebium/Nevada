Démarrer le server : se placer dans le repo nevada-app puis : npm run dev

#Ne pas oubliez dans chaque dossier et de faire : **npm install** : pour installer les packages

Mp Ebium pour avoir access à la bdd


- Installer node avec une version supérieur ou égale à 16.16 https://nodejs.org/fr/download/
- télécharger le zip sur notre https://github.com/Ebium/Nevada
- après le git clone, faire la commande npm install dans le les dossier client, server, dev ou lancer le script npm-i.sh si sur un env Linux
- créer un fichier .env dans le dossier client avec les lignes: 
``` 
JWT_SECRET='Z6sqxPOSgUu_2lIF32xAiQ' 
GENERATE_SOURCEMAP=false 
```

- et aussi créer un fichier .env dans le dossier serveur avec les lignes suivantes :
```
MONGO_URI="mongodb+srv://nevadadb:nevadadb@nevadacluster.ynopy0q.mongodb.net/nevadadb?retryWrites=true&w=majority"
JWT_SECRET='Z6sqxPOSgUu_2lIF32xAiQ'
STRIPE_PRIVATE_KEY="sk_test_51LrLO9JE1Vl9aUiyElWtRFhpLB7oDE5YwmL8h1YFgniEhyugNAiUhlFBzg8qLusFLIzchw9SdDF0QFRlKVudQcDB00T9BwLpiT"
```
- Aller dans le dossier dev, et lancer npm run dev pour démarer le serveur
