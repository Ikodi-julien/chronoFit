DROP DATABASE IF EXISTS `chronoFit-V1`;

CREATE DATABASE IF NOT EXISTS `chronoFit-V1` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chronoFit-V1`;

-- --------------------------------------------------------

CREATE TABLE `bodyPart` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `exercice` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(42) NOT NULL,
  `description` TEXT,
  `mainCat_id` int(11) NOT NULL,
  `bodyPart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `mainCat` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `level` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(42),
  `lastname` VARCHAR(42),
  `pseudo` VARCHAR(42),
  `email` VARCHAR(42) NOT NULL,
  `password` VARCHAR(80),
  `level_id` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `timeline` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(42) NOT NULL,
  `user_id` int(11),
  `content` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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


--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`name`) VALUES
('Compétiteur'),
('Confirmé'),
('Débutant');


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
-- Déchargement des données de la table `exercice`
--

INSERT INTO `exercice` (`mainCat_id`, `bodyPart_id`, `name`, `description`) VALUES
(4, 8, 'Pompe – Push-Up', 'La pompe, corps gainé on vient toucher le sola avec sa8et on remonte bras tendu.'),
(4, 3, 'Tractions – Pull-Up', 'Suspendu à la barre bras tendu, on vient passer le menton au-dessus de la barre. Sans balancement du corps.'),
(4, 3, 'Tractions strict – strict pull', 'Suspendu à la barre bras tendu, on vient passer le menton au-dessus de la barre. Avec balancier (kipping) ou technique butterfly.'),
(4, 3, 'Chest to bar', 'un pull-up avec contact de la barre avec la8sous les clavicules. '),
(4, 2, 'Chin up', 'pull up mains en supination. Le menton doit atteindre la barre.'),
(4, 3, 'Tirage aux anneaux', 'Départ allongé mains accrochées aux anneaux, flexion de bras corps gainé.'),
(4, 4, 'Pompe en poirier – Handstand P', 'Ben une pompe en faisant le poirier :-)'),
(4, 1, 'Toes to bar', 'Suspendu à la barre bras tendu, on va toucher la barre avec les pieds, balancier conseillé.'),
(4, 1, 'Strict toes to bar', 'Suspendu à la barre bras tendu, on va toucher la barre avec les pieds, balancier interdit.'),
(4, 1, 'Genoux aux coudes – Knee to el', 'Suspendu à la barre bras tendu, on va monter les genoux au maxi pour toucher les coudes.'),
(4, 1, 'Montée de genoux – Knee raise', 'Suspendu à la barre bras tendu, on va monter les genoux jusqu’à dépasser l’horizontal.'),
(4, 4, 'Poirier – Handstand', 'Equilibre maintenu sur les mains'),
(4, 4, 'Marche sur les mains – Handsta', 'Ben comme son nom l’indique :-)'),
(4, 6, 'Squat une jambe – Pistol Squat', 'Ben comme son nom l’indique :-)'),
(4, 2, 'Dips', 'En position de départ Surélevé en appuis manuels sur deux supports. Il faut Abaisser le corps lentement jusqu\'à ce que les épaules soient au niveau des coudes puis Pousser vers le haut en redressant le buste et en tendant les bras.'),
(6, 7, 'Bear walk', 'déplacement quadrupédique en gardant les hanches basses à hauteur de bras tendus et le buste horizontal.'),
(4, 7, 'Muscle-up', 'La position de départ est en suspension à la barre ou aux anneaux. Pour le grip aux anneaux les poignets sont engagés, c\'est le false grip. Le muscle-up strict aux anneaux est l\'enchainement d\'une traction stricte (sans balancer) qui permet aux coudes de passer au-dessus de la prise manuelle en prenant appui sur les poignets et d\'une extension-bras ou dips. La position finale est en appui bras tendus. le muscle-up peut être exécuté en mouvement en utilisant un temps de bascule ou kipping.'),
(2, 7, 'Burpee', ' complex combinant, pour la version classique niveau débutant, une flexion des jambes, un appui pieds-mains en planche corps gainé, une pompe, un retour corps groupé en flexion des jambes et un saut.'),
(2, 7, 'Course à pied', 'Course à pied…'),
(2, 7, 'Rameur – Row', 'Tirage rameur'),
(2, 7, 'Corde à sauter – SU', 'Un tour de corde à sauter par saut.'),
(2, 7, 'Corde à sauter – DU', 'Deux tours de corde à sauter par saut.'),
(2, 6, 'Wall Ball', 'Le wall ball consiste à s\'accroupir en position basse de squat avec un MedBall puis se lever et utiliser l\'élan de l\'extension des jambes relayé par l\'extension des bras pour projeter la balle et atteindre une cible sur le mur haute de  3mètres'),
(2, 6, 'Air squat', 'Flexion de jambes sans charge.'),
(2, 6, 'Fente – lunge', 'La fente avant (forward lunge) consiste à garder le corps droit, avancer une jambe, toucher le sol avec le genou de la jambe arrière, retourner à la position de départ, répéter avec l\'autre jambe. On peut marcher en fentes (walking lunge) .On peut aussi reculer en fente (backward lunge)'),
(2, 6, 'fente sautée – Jumping lunges', 'A partir d\'une position jambes écartées en fente, sauter d\'une manière explosive en inversant rapidement la position des jambes avant et arrière.'),
(2, 6, 'Jump', ''),
(2, 6, 'Box jump', ''),
(2, 6, 'Box jump over', ''),
(5, 7, 'Arraché – Snatch', 'En prises manuelles larges déplacer la barre du sol au dessus de la tête.'),
(5, 7, 'Epaulé – Clean', 'C\'est l\'action qui consiste à déplacer verticalement une barre, un Medball, un haltère ou une kettlebell du sol jusqu\'à la8en tirage (ou rowing) pour le stabiliser en appui sur les clavicules et les muscles deltoïdes.'),
(5, 4, 'Push Jerk', 'Barre tenue en position finale de Clean, amorcer une légère flexion de jambes pour passer sous la barre puis soulever la charge à bras tendus au-dessus de la tête Terminer en extension complète des jambes. C\'est le 6° des 9 mouvements fondamentaux du crossfit. '),
(5, 4, 'Push Press', 'La barre étant tenue en position finale de Clean (voir définition du clean) le push press consiste à amorcer une légère flexion de jambes et coordonner leur extension avec avec une extension des bras au-dessus de la tête. C\'est le 5° des 9 mouvements fondamentaux du crossfit. '),
(5, 4, 'Shoulder Press', 'Développé militaire Debout ou assis avec la barre sur l\'avant des épaules ou deux haltères posées sur chacun des deltoides. Il consiste à pousser la barre et tendre les bras en maintenant le bassin gainé.'),
(5, 6, 'BackSquat', 'Squat avec barre sur les épaules'),
(5, 6, 'FrontSquat', 'un squat avec barre placée à l\'avant du corps sur le thorax au niveau des clavicules.'),
(5, 5, 'Soulevé de terre', 'action technique issue de l\'haltérophilie mais qui est aussi un geste quotidien consistant à soulever un poids posé au sol pour le tenir debout buste droit.'),
(3, 1, 'Chaise', ''),
(3, 1, 'Hollow', 'Hollow signifie creux . Hollow Hold est la position de gainage gymnique et c\'est aussi la position de départ de Hollow Rock. Il faut d\'abord s\'allonger sur le dos puis soulever les jambes serrées et avec les pointes de pieds tendues à quelques centimètres du sol. On doit ensuite étirer les bras au-dessus de la tête et les soulever aussi de quelques centimètres, en les maintenant droits et près des oreilles.'),
(3, 1, 'Hollow Rock', 'Il faut d\'abord s\'allonger sur le dos puis soulever les jambes serrées et avec les pointes de pieds tendues à quelques centimètres du sol. On doit ensuite étirer les bras au-dessus de la tête et les soulever aussi de quelques centimètres, en les maintenant droits et près des oreilles. Hollow Rocks c’est basculer d\'avant en arrière en gardant le corps gainé. '),
(3, 1, 'Side to side', 'Assis gainé, on passe un poids de droite à gauche'),
(3, 1, 'Mountain Climber', 'Commencer en position push up. Fléchir une jambe jusqu\'au coude en gardant l\'autre jambe étendue derrière vous. Changer les jambes et répéter.'),
(3, 1, 'Sit up', 'Allongez-vous sur le sol avec les genoux pliés et sur les côtés. Asseyez-vous tout en gardant un noyau engagé et la colonne vertébrale neutre.'),
(3, 1, 'V-up', 'Le V up consiste, à partir de la position allongée sur le dos, bras et jambes tendues, à relever simultanément les bras et les jambes toujours tendus pour aller toucher les pieds avec les deux mains en formant un V avec le corps en position assise sur les fesses puis à redescendre en position allongée corps droit.'),
(3, 1, 'Planche', 'Position de gainage de base, allongé corps tendu en appui sur les avant-bras.'),
(3, 1, 'Superman', 'Le Superman alterne en appui ventral une phase de contraction musculaire en extension dorso-lombaire et une phase de relâchement. L\'extension peut être maintenue un court instant pour travailler le gainage dorsal.');


--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`firstname`, `lastname`, `pseudo`, `email`, `password`, `level_id`) VALUES
('Julien', 'PELLIN', NULL, 'jupellin39@gmail.com', 'bob',  1),
('Gérard', 'Menvussa', NULL, 'jupellin39@gmail.com', 'bob',  2),
('Mélusine', 'Enfaillite', NULL, 'jupellin39@gmail.com', 'bob', 3);

-- --------------------------------------------------------


--
-- Déchargement des données de la table `timeline`
--

INSERT INTO `timeline` (`name`, `user_id`, `content` ) VALUES
('vide', 1, '{\"timeline-name\":\"Vide\"}'),
('Gainage de base', 2, '{\"timeline-name\":\"Gainage de base\",\"timelineId\":\"24\",\"name-interval0\":\"Planche bras tendu\",\"duration-interval0\":\"90\",\"name-interval1\":\"Repos\",\"duration-interval1\":\"15\",\"name-interval2\":\"Planche bras tendu c\\u00f4t\\u00e9 droit\",\"duration-interval2\":\"60\",\"name-interval3\":\"Repos\",\"duration-interval3\":\"15\",\"name-interval4\":\"Planche bras tendu c\\u00f4t\\u00e9 gauche\",\"duration-interval4\":\"60\",\"name-interval5\":\"Repos\",\"duration-interval5\":\"15\",\"name-interval6\":\"Planche bras tendu dos\",\"duration-interval6\":\"60\"}'),
('Epaules - Dos - Abdos 5 rounds', 1, '{\"timeline-name\":\"Epaules - Dos - Abdos 5 rounds\",\"timelineId\":\"29\",\"name-interval0\":\"Dips\",\"duration-interval0\":\"60\",\"name-interval1\":\"Tractions strictes\",\"duration-interval1\":\"60\",\"name-interval2\":\"Tractions Keeping\",\"duration-interval2\":\"60\",\"name-interval3\":\"Pompes\",\"duration-interval3\":\"60\",\"name-interval4\":\"Pompes australiennes - Rowing\",\"duration-interval4\":\"60\",\"name-interval5\":\"Pick Push-Up\",\"duration-interval5\":\"60\",\"name-interval6\":\"Toes To Bar\",\"duration-interval6\":\"60\",\"name-interval7\":\"Repos\",\"duration-interval7\":\"180\"}');

-- --------------------------------------------------------

ALTER TABLE `exercice` ADD FOREIGN KEY (`mainCat_id`) REFERENCES `mainCat` (`id`);
ALTER TABLE `exercice` ADD FOREIGN KEY (`bodyPart_id`) REFERENCES `bodyPart` (`id`);
ALTER TABLE `user` ADD FOREIGN KEY (`level_id`) REFERENCES `level` (`id`);
ALTER TABLE `timeline` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
