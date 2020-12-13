
-- --------------------------------------------------------

--
-- Structure de la table `sportif`
--

CREATE TABLE `sportif` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `membership_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level_id` varchar(30) NOT NULL,
  `coach_name` varchar(30) NOT NULL
);
