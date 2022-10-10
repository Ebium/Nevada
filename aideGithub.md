GIt

git checkout "nomBranche" -> changer de branche
git checkout -b "nombranch" -> créer la brancher "nombrebranche" et aller dessus

git branch -> afficher les branch

git status -> connaitre le statut de la branch : 
- si la branche est propre ( aucun changement)
- sinon les changements

git stash -> "sauvegarde" 
git stash pop -> "revenir à la sauvegarde"
git stash clear -> "supprimer la sauvegarde"

git pull —rebase (sur master) -> mettre à jour sa branche avec la branche sur github

git pull —rebase origin master (sur une autre prendre)-> mettre à jour sa branche avec la branche sur github

Pour commit :
- git add . 
- git commit -m "typeDeChangement(NomDuFichier): changement"
	^(Les deux lignes au dessus permettent de sauvegarder en local ton travail"
- git push :
    - créer une Pull Request (PR), permettant de fusionner la nouvelle branche avec la branche master
