
-- --------------------------------------------------------

--
-- Structure de la table `exercice`
--

CREATE TABLE `exercice` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `weighted` tinyint(1) NOT NULL,
  `weight` int DEFAULT NULL,
  `reps` int DEFAULT NULL,
  `duration` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `exercice`
--

INSERT INTO `exercice` (`id`, `name`, `description`, `weighted`, `weight`, `reps`, `duration`) VALUES
(1, 'Air Squat', 'Ben c\'est le air squat quoi...', 0, NULL, NULL, 0),
(2, 'Pompes', 'Et bé la c\'est les pompes...', 0, NULL, NULL, 0),
(3, 'Clean & Jerk', 'On amène la barre en position de front squat, puis extension pour avoir la charge au-dessus de la tête...', 1, NULL, NULL, 0),
(4, 'Dead-Lift', 'Soulevé de terre', 1, NULL, NULL, 0);
