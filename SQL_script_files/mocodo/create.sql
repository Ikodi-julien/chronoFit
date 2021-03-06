CREATE DATABASE IF NOT EXISTS `LEVELS` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `LEVELS`;

CREATE TABLE `BODYPART` (
  `id` VARCHAR(42),
  `name` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `EXERCICE` (
  `id` VARCHAR(42),
  `name` VARCHAR(42),
  `description` VARCHAR(42),
  `id_1` VARCHAR(42),
  `id_2` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `MAINCAT` (
  `id` VARCHAR(42),
  `name` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `LEVEL` (
  `id` VARCHAR(42),
  `name` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `USER` (
  `id` VARCHAR(42),
  `firstname` VARCHAR(42),
  `lastname` VARCHAR(42),
  `pseudo` VARCHAR(42),
  `email` VARCHAR(42),
  `password` VARCHAR(42),
  `id_1` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TIMELINE` (
  `id` VARCHAR(42),
  `name` VARCHAR(42),
  `content` VARCHAR(42),
  `id_1` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `EXERCICE` ADD FOREIGN KEY (`id_2`) REFERENCES `MAINCAT` (`id`);
ALTER TABLE `EXERCICE` ADD FOREIGN KEY (`id_1`) REFERENCES `BODYPART` (`id`);
ALTER TABLE `USER` ADD FOREIGN KEY (`id_1`) REFERENCES `LEVEL` (`id`);
ALTER TABLE `TIMELINE` ADD FOREIGN KEY (`id_1`) REFERENCES `USER` (`id`);