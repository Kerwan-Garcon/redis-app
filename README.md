## Init project

Prérequis :

Avoir nodeJS sur l'ordinateur.
Avoir make ( déja présent sur linux ) , installer chocolatey puis choco install make.
Avoir docker sur l'ordinateur.

Lancer les bases de données :

make install ( install les deps )
make run ( run les containers )
npx prisma db seed ( run minimum fake datas )

Acceder a redis insight sur le port 5540 sur le localhost.
configurer redis insinght pour y ajouter les informations de la bdd pour la voir visuellement.
host: redis
port: 6379

Lancer l'application web :

npm run dev

Vérifier l'utilisation de REDIS & MySQL dans le projet :

Naviguer jusqu'à `src/actions`, ce dossier contient toutes les queries aux bdd.
Les requêtes utilisent l'orm PRISMA pour SQL et REDIS pour NOSQL.
Chaque informations nécéssaire est enregistré en mémoire dans REDIS après l'avoir récupérer au moins une fois de POSTGRESQL afin de les récupérer plus rapidement par la suite.

Voir la gestion de pub/sub :

Naviger vers `src/lib/courseNotifications.ts`

RECAP :

Question 1/2 : `prisma/schema.prisma` pour voir le model de données , lancer l'app et cliquer sur profil pour voir le profil. ( subscribe / unsub possible aussi depuis la page des courses, possibilité de bug sur le profil )
Question 3 :

a FRONT - lancer le projet et selectionner teacher , aller dans le profil & modifier un cours, ou en ajouter un dans la section cours. ( pas disponible visuellement & à jour voir back )
a BACK - Voir les fonctions dans `src/actions/courses.js` & `src/lib/courseNotifications` pour voir comment fonctionne les notifs sur update.

b FRONT - lancer le projet et selectionner student, aller dans courses ( normalement la page actuel ) et cliquer sur s'inscrire à un cours.
b BACK - voir les fonction dans `src/actions/subscribes.ts` & `src/lib/courseNotifications`

c FRONT - En fonction de la date d'expiration mis dans le champs en bdd, le cours n'est plus disponible.
d BACK - Voir la fonction `refreshCourseExpiration` dans le fichier `src/actions/courses` . Cette fonction est utilisé à chaque abonnement a un cours.

Question 4 :

Acceder à la page courses en student ou teacher, puis utiliser la barre de recherche pour filtrer les cours. Il est possible d'ecrire un teacher, nom de cours ... et il cherchera en fonction.

PS :
