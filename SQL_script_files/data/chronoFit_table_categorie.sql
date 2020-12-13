
--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `parent`, `name`) VALUES
(1, NULL, 'CARDIO'),
(2, NULL, 'RENFO'),
(3, 'RENFO', 'Epaules'),
(4, 'CARDIO', 'Jambes'),
(5, 'RENFO', 'FullBody');
