-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 27 fév. 2021 à 13:12
-- Version du serveur :  10.3.25-MariaDB-0ubuntu0.20.04.1
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chronoFit`
--

-- --------------------------------------------------------

--
-- Structure de la table `bodyPart`
--

CREATE TABLE `bodyPart` (
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bodyPart`
--

INSERT INTO `bodyPart` (`name`) VALUES
('Abdo'),
('Bras'),
('Dos'),
('Epaules'),
('Fesses'),
('Jambes'),
('Multiple'),
('Poitrine');

-- --------------------------------------------------------

--
-- Structure de la table `exercice`
--

CREATE TABLE `exercice` (
  `id` int(11) NOT NULL,
  `mainCat` varchar(30) NOT NULL,
  `bodyPart` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `exercice`
--

INSERT INTO `exercice` (`id`, `mainCat`, `bodyPart`, `name`, `description`) VALUES
(1, 'GYM', 'Poitrine', 'Pompe – Push-Up', 'La pompe, corps gainé on vient toucher le sola avec sa poitrine et on remonte bras tendu.'),
(2, 'GYM', 'Dos', 'Tractions – Pull-Up', 'Suspendu à la barre bras tendu, on vient passer le menton au-dessus de la barre. Sans balancement du corps.'),
(3, 'GYM', 'Dos', 'Tractions strict – strict pull', 'Suspendu à la barre bras tendu, on vient passer le menton au-dessus de la barre. Avec balancier (kipping) ou technique butterfly.'),
(4, 'GYM', 'Dos', 'Chest to bar', 'un pull-up avec contact de la barre avec la poitrine sous les clavicules. '),
(5, 'GYM', 'Bras', 'Chin up', 'pull up mains en supination. Le menton doit atteindre la barre.'),
(6, 'GYM', 'Dos', 'Tirage aux anneaux', 'Départ allongé mains accrochées aux anneaux, flexion de bras corps gainé.'),
(7, 'GYM', 'Epaules', 'Pompe en poirier – Handstand P', 'Ben une pompe en faisant le poirier :-)'),
(8, 'GYM', 'Abdo', 'Toes to bar', 'Suspendu à la barre bras tendu, on va toucher la barre avec les pieds, balancier conseillé.'),
(9, 'GYM', 'Abdo', 'Strict toes to bar', 'Suspendu à la barre bras tendu, on va toucher la barre avec les pieds, balancier interdit.'),
(10, 'GYM', 'Abdo', 'Genoux aux coudes – Knee to el', 'Suspendu à la barre bras tendu, on va monter les genoux au maxi pour toucher les coudes.'),
(11, 'GYM', 'Abdo', 'Montée de genoux – Knee raise', 'Suspendu à la barre bras tendu, on va monter les genoux jusqu’à dépasser l’horizontal.'),
(12, 'GYM', 'Epaules', 'Poirier – Handstand', 'Equilibre maintenu sur les mains'),
(13, 'GYM', 'Epaules', 'Marche sur les mains – Handsta', 'Ben comme son nom l’indique :-)'),
(14, 'GYM', 'Jambes', 'Squat une jambe – Pistol Squat', 'Ben comme son nom l’indique :-)'),
(15, 'GYM', 'Bras', 'Dips', 'En position de départ Surélevé en appuis manuels sur deux supports. Il faut Abaisser le corps lentement jusqu\'à ce que les épaules soient au niveau des coudes puis Pousser vers le haut en redressant le buste et en tendant les bras.'),
(16, 'WARMUP', 'Multiple', 'Bear walk', 'déplacement quadrupédique en gardant les hanches basses à hauteur de bras tendus et le buste horizontal.'),
(17, 'GYM', 'Multiple', 'Muscle-up', 'La position de départ est en suspension à la barre ou aux anneaux. Pour le grip aux anneaux les poignets sont engagés, c\'est le false grip. Le muscle-up strict aux anneaux est l\'enchainement d\'une traction stricte (sans balancer) qui permet aux coudes de passer au-dessus de la prise manuelle en prenant appui sur les poignets et d\'une extension-bras ou dips. La position finale est en appui bras tendus. le muscle-up peut être exécuté en mouvement en utilisant un temps de bascule ou kipping.'),
(18, 'CARDIO', 'Multiple', 'Burpee', ' complex combinant, pour la version classique niveau débutant, une flexion des jambes, un appui pieds-mains en planche corps gainé, une pompe, un retour corps groupé en flexion des jambes et un saut.'),
(19, 'CARDIO', 'Multiple', 'Course à pied', 'Course à pied…'),
(20, 'CARDIO', 'Multiple', 'Rameur – Row', 'Tirage rameur'),
(21, 'CARDIO', 'Multiple', 'Corde à sauter – SU', 'Un tour de corde à sauter par saut.'),
(22, 'CARDIO', 'Multiple', 'Corde à sauter – DU', 'Deux tours de corde à sauter par saut.'),
(23, 'CARDIO', 'Jambes', 'Wall Ball', 'Le wall ball consiste à s\'accroupir en position basse de squat avec un MedBall puis se lever et utiliser l\'élan de l\'extension des jambes relayé par l\'extension des bras pour projeter la balle et atteindre une cible sur le mur haute de  3mètres'),
(24, 'CARDIO', 'Jambes', 'Air squat', 'Flexion de jambes sans charge.'),
(25, 'CARDIO', 'Jambes', 'Fente – lunge', 'La fente avant (forward lunge) consiste à garder le corps droit, avancer une jambe, toucher le sol avec le genou de la jambe arrière, retourner à la position de départ, répéter avec l\'autre jambe. On peut marcher en fentes (walking lunge) .On peut aussi reculer en fente (backward lunge)'),
(26, 'CARDIO', 'Jambes', 'fente sautée – Jumping lunges', 'A partir d\'une position jambes écartées en fente, sauter d\'une manière explosive en inversant rapidement la position des jambes avant et arrière.'),
(27, 'CARDIO', 'Jambes', 'Jump', ''),
(28, 'CARDIO', 'Jambes', 'Box jump', ''),
(29, 'CARDIO', 'Jambes', 'Box jump over', ''),
(30, 'HALTERO', 'Multiple', 'Arraché – Snatch', 'En prises manuelles larges déplacer la barre du sol au dessus de la tête.'),
(31, 'HALTERO', 'Multiple', 'Epaulé – Clean', 'C\'est l\'action qui consiste à déplacer verticalement une barre, un Medball, un haltère ou une kettlebell du sol jusqu\'à la poitrine en tirage (ou rowing) pour le stabiliser en appui sur les clavicules et les muscles deltoïdes.'),
(32, 'HALTERO', 'Epaules', 'Push Jerk', 'Barre tenue en position finale de Clean, amorcer une légère flexion de jambes pour passer sous la barre puis soulever la charge à bras tendus au-dessus de la tête Terminer en extension complète des jambes. C\'est le 6° des 9 mouvements fondamentaux du crossfit. '),
(33, 'HALTERO', 'Epaules', 'Push Press', 'La barre étant tenue en position finale de Clean (voir définition du clean) le push press consiste à amorcer une légère flexion de jambes et coordonner leur extension avec avec une extension des bras au-dessus de la tête. C\'est le 5° des 9 mouvements fondamentaux du crossfit. '),
(34, 'HALTERO', 'Epaules', 'Shoulder Press', 'Développé militaire Debout ou assis avec la barre sur l\'avant des épaules ou deux haltères posées sur chacun des deltoides. Il consiste à pousser la barre et tendre les bras en maintenant le bassin gainé.'),
(35, 'HALTERO', 'Jambes', 'BackSquat', 'Squat avec barre sur les épaules'),
(36, 'HALTERO', 'Jambes', 'FrontSquat', 'un squat avec barre placée à l\'avant du corps sur le thorax au niveau des clavicules.'),
(37, 'HALTERO', 'Fesses', 'Soulevé de terre', 'action technique issue de l\'haltérophilie mais qui est aussi un geste quotidien consistant à soulever un poids posé au sol pour le tenir debout buste droit.'),
(38, 'CORE', 'Abdo', 'Chaise', ''),
(39, 'CORE', 'Abdo', 'Hollow', 'Hollow signifie creux . Hollow Hold est la position de gainage gymnique et c\'est aussi la position de départ de Hollow Rock. Il faut d\'abord s\'allonger sur le dos puis soulever les jambes serrées et avec les pointes de pieds tendues à quelques centimètres du sol. On doit ensuite étirer les bras au-dessus de la tête et les soulever aussi de quelques centimètres, en les maintenant droits et près des oreilles.'),
(40, 'CORE', 'Abdo', 'Hollow Rock', 'Il faut d\'abord s\'allonger sur le dos puis soulever les jambes serrées et avec les pointes de pieds tendues à quelques centimètres du sol. On doit ensuite étirer les bras au-dessus de la tête et les soulever aussi de quelques centimètres, en les maintenant droits et près des oreilles. Hollow Rocks c’est basculer d\'avant en arrière en gardant le corps gainé. '),
(41, 'CORE', 'Abdo', 'Side to side', 'Assis gainé, on passe un poids de droite à gauche'),
(42, 'CORE', 'Abdo', 'Mountain Climber', 'Commencer en position push up. Fléchir une jambe jusqu\'au coude en gardant l\'autre jambe étendue derrière vous. Changer les jambes et répéter.'),
(43, 'CORE', 'Abdo', 'Sit up', 'Allongez-vous sur le sol avec les genoux pliés et sur les côtés. Asseyez-vous tout en gardant un noyau engagé et la colonne vertébrale neutre.'),
(44, 'CORE', 'Abdo', 'V-up', 'Le V up consiste, à partir de la position allongée sur le dos, bras et jambes tendues, à relever simultanément les bras et les jambes toujours tendus pour aller toucher les pieds avec les deux mains en formant un V avec le corps en position assise sur les fesses puis à redescendre en position allongée corps droit.'),
(45, 'CORE', 'Abdo', 'Planche', 'Position de gainage de base, allongé corps tendu en appui sur les avant-bras.'),
(46, 'CORE', 'Abdo', 'Superman', 'Le Superman alterne en appui ventral une phase de contraction musculaire en extension dorso-lombaire et une phase de relâchement. L\'extension peut être maintenue un court instant pour travailler le gainage dorsal.');

-- --------------------------------------------------------

--
-- Structure de la table `level`
--

CREATE TABLE `level` (
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`name`) VALUES
('Compétiteur'),
('Confirmé'),
('Débutant');

-- --------------------------------------------------------

--
-- Structure de la table `mainCat`
--

CREATE TABLE `mainCat` (
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mainCat`
--

INSERT INTO `mainCat` (`name`) VALUES
('ALL'),
('CARDIO'),
('CORE'),
('GYM'),
('HALTERO'),
('WARMUP');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `pseudo` varchar(30) NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `membership_date` varchar(30) NULL,
  `level_id` varchar(30) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `pseudo`, `email`, `password`, `birth_date`, `membership_date`, `level_id`) VALUES
(1, 'Julien', 'PELLIN', NULL, 'jupellin39@gmail.com', 'bob',  NULL,'2020-10-26 19:34:40', 'Confirmé'),
(2, 'Gérard', 'Menvussa', NULL, 'jupellin39@gmail.com', 'bob',  NULL,'2020-10-26 19:36:31', 'Débutant'),
(3, 'Mélusine', 'Enfaillite', NULL, 'jupellin39@gmail.com', 'bob', NULL,'2020-10-26 19:36:31', 'Compétiteur');

-- --------------------------------------------------------

--
-- Structure de la table `timeline`
--

CREATE TABLE `timeline` (
  `id` int(11) NOT NULL,
  `timelineName` varchar(255) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `timeline`
--

INSERT INTO `timeline` (`id`, `timelineName`, `content`) VALUES
(14, 'vide', '{\"timeline-name\":\"Vide\"}'),
(24, 'Gainage de base', '{\"timeline-name\":\"Gainage de base\",\"timelineId\":\"24\",\"name-interval0\":\"Planche bras tendu\",\"duration-interval0\":\"90\",\"name-interval1\":\"Repos\",\"duration-interval1\":\"15\",\"name-interval2\":\"Planche bras tendu c\\u00f4t\\u00e9 droit\",\"duration-interval2\":\"60\",\"name-interval3\":\"Repos\",\"duration-interval3\":\"15\",\"name-interval4\":\"Planche bras tendu c\\u00f4t\\u00e9 gauche\",\"duration-interval4\":\"60\",\"name-interval5\":\"Repos\",\"duration-interval5\":\"15\",\"name-interval6\":\"Planche bras tendu dos\",\"duration-interval6\":\"60\"}'),
(29, 'Epaules - Dos - Abdos 5 rounds', '{\"timeline-name\":\"Epaules - Dos - Abdos 5 rounds\",\"timelineId\":\"29\",\"name-interval0\":\"Dips\",\"duration-interval0\":\"60\",\"name-interval1\":\"Tractions strictes\",\"duration-interval1\":\"60\",\"name-interval2\":\"Tractions Keeping\",\"duration-interval2\":\"60\",\"name-interval3\":\"Pompes\",\"duration-interval3\":\"60\",\"name-interval4\":\"Pompes australiennes - Rowing\",\"duration-interval4\":\"60\",\"name-interval5\":\"Pick Push-Up\",\"duration-interval5\":\"60\",\"name-interval6\":\"Toes To Bar\",\"duration-interval6\":\"60\",\"name-interval7\":\"Repos\",\"duration-interval7\":\"180\"}');

-- --------------------------------------------------------

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bodyPart`
--
ALTER TABLE `bodyPart`
  ADD PRIMARY KEY (`name`);

--
-- Index pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`name`);

--
-- Index pour la table `mainCat`
--
ALTER TABLE `mainCat`
  ADD PRIMARY KEY (`name`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_user_fk` (`level_id`),

--
-- Index pour la table `timeline`
--
ALTER TABLE `timeline`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `exerciceInTraining`
--
ALTER TABLE `exerciceInTraining`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `timeline`
--
ALTER TABLE `timeline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `training`
--
ALTER TABLE `training`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `coach_user_fk` FOREIGN KEY (`coach_name`) REFERENCES `coach` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `group_user_fk` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_training`
--
ALTER TABLE `user_training`
  ADD CONSTRAINT `user_user_training_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `training_user_training_fk` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `training_exercices`
--
ALTER TABLE `training_exercices`
  ADD CONSTRAINT `exercice_training_exercices_fk` FOREIGN KEY (`exerciceInTraining_id`) REFERENCES `exerciceInTraining` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `training_training_exercices_fk` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
