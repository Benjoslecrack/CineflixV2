-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: cineflix
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (101,'Bernhard Kunze'),(102,'Roberto Schiller'),(103,'Jody Lowe'),(104,'Rodrick Rice'),(105,'Peggie Schaefer'),(106,'Idell Stracke'),(107,'Mable Kihn'),(108,'Clay Murazik'),(109,'Sigrid Bartell'),(110,'Marlin Jones'),(111,'Forrest Morissette'),(112,'Nyasia Skiles'),(113,'Felton Botsford'),(114,'Marie Dooley'),(115,'Sarai Wisozk'),(116,'Clarabelle Denesik'),(117,'Louisa Fahey'),(118,'Osvaldo Labadie'),(119,'Noemie Gutkowski'),(120,'Hassie Osinski'),(121,'Creola Jaskolski'),(122,'Lane Walter'),(123,'Marcella Sauer'),(124,'Quinten Gutkowski'),(125,'Gus Kuhlman'),(126,'Orion Harris'),(127,'Cruz Schamberger'),(128,'Brycen Raynor'),(129,'Rudolph Hoppe'),(130,'Sydni Stark'),(131,'Monty Wolf'),(132,'Lesly Hoppe'),(133,'Tremaine Gorczany'),(134,'Elwin Runolfsson'),(135,'Rene Corwin'),(136,'Ericka Ziemann'),(137,'Sister West'),(138,'Anita Bergstrom'),(139,'Harley Blanda'),(140,'Marcia Olson'),(141,'Harvey Jaskolski'),(142,'Alexanne Hoppe'),(143,'Gerda Metz'),(144,'Dustin Kohler'),(145,'Abby Parisian'),(146,'Nathen Walsh'),(147,'Drake Fay'),(148,'Khalid Mitchell'),(149,'Llewellyn Carter'),(150,'Ivy Yost');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actors_movies`
--

DROP TABLE IF EXISTS `actors_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors_movies` (
  `actors_id` int NOT NULL,
  `movies_id` int NOT NULL,
  PRIMARY KEY (`actors_id`,`movies_id`),
  KEY `IDX_B3012DC07168CF59` (`actors_id`),
  KEY `IDX_B3012DC053F590A4` (`movies_id`),
  CONSTRAINT `FK_B3012DC053F590A4` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_B3012DC07168CF59` FOREIGN KEY (`actors_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors_movies`
--

LOCK TABLES `actors_movies` WRITE;
/*!40000 ALTER TABLE `actors_movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `actors_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3AF34668727ACA70` (`parent_id`),
  CONSTRAINT `FK_3AF34668727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (115,NULL,'Nouveautés','nouveautes'),(116,NULL,'Tendances','tendances'),(117,NULL,'action et aventure','action-et-aventure'),(118,NULL,'Comédies','comedies'),(119,NULL,'Documentaires','documentaires'),(120,NULL,'Drames','drames'),(121,NULL,'Horreur','horreur'),(122,NULL,'Romance','romance'),(123,NULL,'SF','sf'),(124,NULL,'Fantastique','fantastique'),(125,NULL,'Sport','sport'),(126,NULL,'Thrillers','thrillers'),(127,NULL,'Policier','policier'),(128,NULL,'Films','films'),(129,128,'Films de BD et super-héros','10118'),(130,128,'Films de gangsters','30140'),(131,128,'Films de guerre','3373'),(132,128,'Films post-apocalyptiques','21076'),(133,128,'Films westerns','7700'),(134,128,'Films français','58807'),(135,128,'Films d’horreur déjantés','1155'),(136,128,'Films de monstres','947'),(137,128,'Films gore','615'),(138,128,'Films de zombies','75421'),(139,128,'Films de slashers et de tueurs en série','8646'),(140,128,'Films pour ados','2340'),(141,128,'Films jeunesse et famille','783'),(142,128,'Films fantastiques','9744'),(143,128,'Films sur les arts martiaux','8985'),(144,128,'nom','slug'),(145,NULL,'Séries','series'),(146,145,'Séries absurdes','77205'),(147,145,'Séries d’action et d’aventure','10673'),(148,145,'Séries aisatiques','85543'),(149,145,'Séries de super-héros','53717'),(150,145,'Séries bonne humeur','16688'),(151,145,'Séries de complots','27607'),(152,145,'Séries dramatiques','26018'),(153,145,'Séries effrayantes','25989'),(154,145,'Séries émotion','25833'),(155,145,'Séries françaises','62041'),(156,145,'Séries judiciaires','25801'),(157,145,'Séries nostalgie','2008977'),(158,145,'Séries pour ados','60951'),(159,145,'Séries psychologiques','26127'),(160,145,'Séries avec voyage dans le temps','75435'),(161,NULL,'Animes','animes'),(162,161,'Animation inspirée d’un jeu vidéo','93081'),(163,161,'Animation pour adultes','11881'),(164,161,'Anime comique','9302'),(165,161,'Anime d’action','2653'),(166,161,'Anime dramatique','452'),(167,161,'Anime fantastique','11146'),(168,161,'Anime d’horreur','10695'),(169,161,'Anime SF','2729'),(170,161,'Séries d’animation japonaise','6721'),(171,161,'Autres séries d’animation','7424');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_movies`
--

DROP TABLE IF EXISTS `categories_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_movies` (
  `categories_id` int NOT NULL,
  `movies_id` int NOT NULL,
  PRIMARY KEY (`categories_id`,`movies_id`),
  KEY `IDX_CE77D308A21214B7` (`categories_id`),
  KEY `IDX_CE77D30853F590A4` (`movies_id`),
  CONSTRAINT `FK_CE77D30853F590A4` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_CE77D308A21214B7` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_movies`
--

LOCK TABLES `categories_movies` WRITE;
/*!40000 ALTER TABLE `categories_movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20230410155524','2023-04-10 17:55:37',1515);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `available_at` datetime NOT NULL,
  `delivered_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_date` date NOT NULL,
  `director` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_by_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(1) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `IDX_5E06116FB03A8386` (`created_by_id`),
  CONSTRAINT `FK_5E06116FB03A8386` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists_movies`
--

DROP TABLE IF EXISTS `playlists_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists_movies` (
  `playlists_id` int NOT NULL,
  `movies_id` int NOT NULL,
  PRIMARY KEY (`playlists_id`,`movies_id`),
  KEY `IDX_2ECB6AB09F70CF56` (`playlists_id`),
  KEY `IDX_2ECB6AB053F590A4` (`movies_id`),
  CONSTRAINT `FK_2ECB6AB053F590A4` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_2ECB6AB09F70CF56` FOREIGN KEY (`playlists_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_movies`
--

LOCK TABLES `playlists_movies` WRITE;
/*!40000 ALTER TABLE `playlists_movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists_users`
--

DROP TABLE IF EXISTS `playlists_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists_users` (
  `playlists_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`playlists_id`,`users_id`),
  KEY `IDX_79D016AE9F70CF56` (`playlists_id`),
  KEY `IDX_79D016AE67B3B43D` (`users_id`),
  CONSTRAINT `FK_79D016AE67B3B43D` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_79D016AE9F70CF56` FOREIGN KEY (`playlists_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_users`
--

LOCK TABLES `playlists_users` WRITE;
/*!40000 ALTER TABLE `playlists_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password_request`
--

DROP TABLE IF EXISTS `reset_password_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_password_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `selector` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `requested_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `expires_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_7CE748AA76ED395` (`user_id`),
  CONSTRAINT `FK_7CE748AA76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password_request`
--

LOCK TABLES `reset_password_request` WRITE;
/*!40000 ALTER TABLE `reset_password_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_password_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user' COMMENT '(DC2Type:json)',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profil_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'images/default.jpg',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '(DC2Type:datetime_immutable)',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '"null"',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1483A5E9E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'fontaine28210@gmail.com','user','$2a$10$DAAeGybAIHaj18.p8uyHjuIS.Zu4jOVjA19bpe/zuSug9v.vagV5m','benjy','public\\images\\profil\\default.png','2023-05-24 09:46:03',0,'2023-05-24 09:46:03','\"null\"'),(13,'qsdf@qsdf.fr','user','$2a$10$IcavYkaFP7efvXl272Qdh.Q51Pdg7xVjqYh8zQoY4iryH3rtFi6De','qsdf','public\\images\\profil\\default.png','2023-05-24 12:45:20',0,'2023-05-24 12:45:20','\"null\"'),(30,'test@test.fr','user','$2a$10$.Uq6KHCj7COA.VEmBsXVAuerWGNJ1GoteF8xEgJndnBpXwjBAlE/K','test','images/default.jpg','2023-05-26 15:47:01',0,'2023-05-26 15:47:41','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUxMDg4MjEsImV4cCI6MTY4NTE5NTIyMX0.senLD53skVly0oIpAA-DuHaVIIGAvBSF3IV_6qskPdc'),(31,'pablo@pablo.fr','user','$2a$10$zcclhGBfDrLPAMetbAxRpu1UAT4Y9iZlNCSWuPnjU3/.VLO8D6NjC','pablo','images/default.jpg','2023-05-30 09:03:07',0,'2023-05-30 09:03:07','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODU0MzAxODcsImV4cCI6MTY4NTUxNjU4N30.V3MJX7a8JhQUifrFh542xKec3NTQgckMLG4cDb13Xh0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_movies`
--

DROP TABLE IF EXISTS `users_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_movies` (
  `users_id` int NOT NULL,
  `movies_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`movies_id`),
  KEY `IDX_C9F963A067B3B43D` (`users_id`),
  KEY `IDX_C9F963A053F590A4` (`movies_id`),
  CONSTRAINT `FK_C9F963A053F590A4` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_C9F963A067B3B43D` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_movies`
--

LOCK TABLES `users_movies` WRITE;
/*!40000 ALTER TABLE `users_movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_movies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-30 16:07:39
