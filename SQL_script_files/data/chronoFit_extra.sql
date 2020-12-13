
--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`name`);

--
-- Index pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `exercice_categorie`
--
ALTER TABLE `exercice_categorie`
  ADD PRIMARY KEY (`exercice_id`,`categorie_id`),
  ADD KEY `categorie_exercice_categorie_fk` (`categorie_id`);

--
-- Index pour la table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sportif`
--
ALTER TABLE `sportif`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sportif_idx` (`name`,`surname`),
  ADD KEY `group_sportif_fk` (`level_id`),
  ADD KEY `coach_sportif_fk` (`coach_name`);

--
-- Index pour la table `sportif_training`
--
ALTER TABLE `sportif_training`
  ADD PRIMARY KEY (`sportif_id`,`training_id`),
  ADD KEY `training_sportif_training_fk` (`training_id`);

--
-- Index pour la table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `training_exercices`
--
ALTER TABLE `training_exercices`
  ADD PRIMARY KEY (`training_id`,`exercice_id`),
  ADD KEY `exercice_training_exercices_fk` (`exercice_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `training`
--
ALTER TABLE `training`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `exercice_categorie`
--
ALTER TABLE `exercice_categorie`
  ADD CONSTRAINT `categorie_exercice_categorie_fk` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `exercice_exercice_categorie_fk` FOREIGN KEY (`exercice_id`) REFERENCES `exercice` (`id`);

--
-- Contraintes pour la table `sportif`
--
ALTER TABLE `sportif`
  ADD CONSTRAINT `coach_sportif_fk` FOREIGN KEY (`coach_name`) REFERENCES `coach` (`name`),
  ADD CONSTRAINT `group_sportif_fk` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`);

--
-- Contraintes pour la table `sportif_training`
--
ALTER TABLE `sportif_training`
  ADD CONSTRAINT `sportif_sportif_training_fk` FOREIGN KEY (`sportif_id`) REFERENCES `sportif` (`id`),
  ADD CONSTRAINT `training_sportif_training_fk` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`);

--
-- Contraintes pour la table `training_exercices`
--
ALTER TABLE `training_exercices`
  ADD CONSTRAINT `exercice_training_exercices_fk` FOREIGN KEY (`exercice_id`) REFERENCES `exercice` (`id`),
  ADD CONSTRAINT `training_training_exercices_fk` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`);
