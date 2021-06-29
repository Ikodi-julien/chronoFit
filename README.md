# CHRONOFIT-PHP

## Besoins

Une application accessible sur le web, qui doit permettre de créer et lire des entrainements sportifs.
Les entrainements sont, pour la première version, une liste d'exercices à réaliser.
Chaque exercice a :
* Un nom,
* Une durée,

## User Cases

Les différents utilisateurs :
* L'utilisateur non identifié, (accès en lecture API)
* L'utilisateur identifié, a un compte, accès en lecture et écriture d'entrainement.

| En tant que ... | Je veux ... | Afin de ...|
| :---| :---| :---|
| V1 - Utilisateur non identifié | Avoir accès aux entrainements existant| Pouvoir tester l'application |
| V1 - Utilisateur non identifié | Pouvoir créer un compte | Avoir accès aux autres fonctionnalités |
| V1 - Utilisateur identifié | Pouvoir créer des entrainements | Avoir des entrainements personnalisés |
| V1 - Utilisateur identifié | Pouvoir lire les entrainements que j'ai créé | Avoir des entrainements personnalisés |

## Entités du MCD

A ce stade, les différentes entités identifiées :
* Entrainement,
* Exercice,
* Utilisateur,

