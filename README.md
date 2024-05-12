## Init project

Prérequis :

Avoir nodeJS sur l'ordinateur.
Avoir make ( déja présent sur linux ) , installer chocolatey puis choco install make.
Avoir docker sur l'ordinateur.

Lancer les bases de données :

make install
make run
npx prisma db seed

configurer redis insinght pour y ajouter les informations de la bdd pour la voir visuellement.
host: redis
port: 6379

Lancer l'application web :

npm run dev

Vérifier l'utilisation de REDIS & MySQL dans le projet :

Naviguer jusqu'à `src/actions`, ce dossier contient toutes les queries aux bdd.
Les requêtes utilisent l'orm PRISMA pour SQL et REDIS pour NOSQL.
Chaque informations nécéssaire est enregistré en mémoire dans REDIS après l'avoir récupérer au moins une fois de POSTGRESQL afin de les récupérer plus rapidement par la suite.
