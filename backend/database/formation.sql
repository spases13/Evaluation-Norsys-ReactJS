-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2024 at 04:14 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `formation`
--

-- --------------------------------------------------------

--
-- Table structure for table `adherent`
--

DROP TABLE IF EXISTS `adherent`;
CREATE TABLE IF NOT EXISTS `adherent` (
  `id_adherent` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_inscription` datetime(6) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `dateinscription` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_adherent`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adherent`
--

INSERT INTO `adherent` (`id_adherent`, `date_inscription`, `nom`, `prenom`, `tel`, `dateinscription`) VALUES
(1, '2024-03-01 16:00:00.000000', 'Mohammed', 'Ali', '1234567890', NULL),
(2, '2024-03-15 16:00:00.000000', 'Fatima', 'Khaled', '0987654321', NULL),
(3, '2024-03-02 16:00:00.000000', 'Youssef', 'Ahmed', '1234567890', NULL),
(4, '2024-03-18 16:00:00.000000', 'Leila', 'Samir', '0117654321', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
CREATE TABLE IF NOT EXISTS `formation` (
  `id_formation` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_debut` datetime(6) DEFAULT NULL,
  `date_fin` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_formation`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formation`
--

INSERT INTO `formation` (`id_formation`, `date_debut`, `date_fin`, `description`, `titre`) VALUES
(1, '2024-04-01 19:00:00.000000', '2024-04-15 16:00:00.000000', 'Description Java', 'Java'),
(2, '2024-04-02 16:00:00.000000', '2024-04-16 16:00:00.000000', 'Description Python', 'Python'),
(3, '2024-04-03 16:00:00.000000', '2024-04-17 17:00:00.000000', 'Description Soft Skills', 'Soft Skills'),
(4, '2024-04-04 16:00:00.000000', '2024-04-18 16:00:00.000000', 'Description Web Development', 'Web Development'),
(5, '2024-04-05 16:00:00.000000', '2024-04-19 19:00:00.000000', 'Description Data Science', 'Data Science'),
(6, '2024-04-06 16:00:00.000000', '2024-04-20 16:00:00.000000', 'Description Machine Learning', 'Machine Learning');

-- --------------------------------------------------------

--
-- Table structure for table `formation_adherent`
--

DROP TABLE IF EXISTS `formation_adherent`;
CREATE TABLE IF NOT EXISTS `formation_adherent` (
  `affectation_id` bigint(20) NOT NULL,
  `adherent_id` bigint(20) NOT NULL,
  `formation_id` bigint(20) NOT NULL,
  PRIMARY KEY (`affectation_id`,`formation_id`,`adherent_id`),
  KEY `FKpaat65clkqgk6qxy91enf0vov` (`adherent_id`),
  KEY `FKdf00nwwjw3liqi4dd8f5p57x1` (`formation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formation_adherent`
--

INSERT INTO `formation_adherent` (`affectation_id`, `adherent_id`, `formation_id`) VALUES
(52, 1, 1),
(53, 2, 3),
(54, 2, 1),
(57, 2, 2),
(4, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `formation_adherent_seq`
--

DROP TABLE IF EXISTS `formation_adherent_seq`;
CREATE TABLE IF NOT EXISTS `formation_adherent_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formation_adherent_seq`
--

INSERT INTO `formation_adherent_seq` (`next_val`) VALUES
(151);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `formation_adherent`
--
ALTER TABLE `formation_adherent`
  ADD CONSTRAINT `FKdf00nwwjw3liqi4dd8f5p57x1` FOREIGN KEY (`formation_id`) REFERENCES `formation` (`id_formation`),
  ADD CONSTRAINT `FKpaat65clkqgk6qxy91enf0vov` FOREIGN KEY (`adherent_id`) REFERENCES `adherent` (`id_adherent`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
