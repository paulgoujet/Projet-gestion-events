-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: events_app
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Cinéma'),(1,'Concert'),(4,'Conférence'),(2,'Sport');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `capacity` int unsigned DEFAULT NULL,
  `status` enum('DRAFT','PUBLISHED','CANCELED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `category_id` int unsigned DEFAULT NULL,
  `location_id` int unsigned DEFAULT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_events_category` (`category_id`),
  KEY `fk_events_location` (`location_id`),
  KEY `fk_events_created_by` (`created_by`),
  CONSTRAINT `fk_events_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_events_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_events_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (7,'Concert Playboi Carti','Guest : Lil Tjay','2025-12-20 19:00:00','2025-12-20 22:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 16:53:34','https://media.ouest-france.fr/v1/pictures/MjAyNTAzODQ1MjIyMjZjOTkxNWZkODM0NzExNDU5OTVkYTlmZGU?width=630&height=354&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=5dbb7714e2ff02bdc08a07c93c16a0c9e2daf31d6e6bd4cf2d575b79e53cff9c'),(8,'Concert Ken Carson','Guest : PartyNextDoor','2025-12-22 20:00:00','2025-12-22 00:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 16:55:06','https://www.popnmusic.fr/wp-content/uploads/2025/04/More-Chaos-3939-de-Ken-Carson-capitalise-sur-une.jpg'),(9,'Concert PartyNextDoor','Guest : Drake','2025-12-19 19:00:00','2025-12-19 22:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 16:57:36','https://www.iggymagazine.com/wp-content/uploads/2025/06/Drake-et-PARTYNEXTDOOR-696x392.jpg'),(10,'Concert Ninho','Guest : Gazo','2025-12-15 19:00:00','2025-12-16 02:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 16:59:07','https://rapunchline.fr/wp-content/uploads/2023/02/ninho-vient-de-faire-une-tres-grosse-annonce-696x359.jpg'),(11,'Concert LaMano19','Guest : NonoLaGrint','2025-02-01 19:00:00','2025-02-01 23:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 17:08:49','https://yt3.googleusercontent.com/X_5tjzg3o0yrO46gOruNRGaiJ9KIOnNPeCLuMHqvaoxfiUfINi_jApqRnV8akZkiM69m6qodOw=s900-c-k-c0x00ffffff-no-rj'),(12,'Concert NonoLaGrint',NULL,'2025-12-22 21:00:00','2025-12-22 00:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 17:11:00','https://cdn.shopify.com/s/files/1/0900/2952/3323/files/Nono_La_Grinta.jpg?v=1746459179'),(13,'Concert Daft Punk',NULL,'2025-12-27 20:00:00','2025-12-27 00:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 17:12:04','https://www.allzicradio.com/media/news/daft-punk-leur-nouveau-son-glbtm-enfin-disponible_6442958ea3108.png'),(14,'Concert Jhené Aiko',NULL,'2026-02-12 12:00:00','2026-02-12 18:00:00',1000,'PUBLISHED',1,1,3,'2025-12-12 17:13:49','https://www.davibemag.com/wp-content/uploads/2015/06/jhene-da-vibe.png');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Stade National','12 rue du stade','Paris'),(2,'Salle Polyvalente','45 avenue centrale','Lyon'),(3,'Théâtre Lumière','10 rue du cinéma','Marseille');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `event_id` int unsigned NOT NULL,
  `status` enum('CONFIRMED','CANCELED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CONFIRMED',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_event` (`user_id`,`event_id`),
  KEY `fk_registrations_event` (`event_id`),
  CONSTRAINT `fk_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_registrations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Paul','Dupont','paul@test.com','$2b$10$BLagFcw64MMYKxP1WeB.V.FMyrLQybxFIw72O56tpPBOjNYogi7CS','USER','2025-11-30 20:33:17'),(3,'Admin','Root','admin@test.com','$2b$10$/STvZTh.IgTM03PR/Khv3eQJWL2aAncy0XCT9rA21LPbD9B2sNcwC','ADMIN','2025-11-30 21:39:05'),(4,'Test','User','user@test.com','$2b$10$xo.0CJH0GA61BXiPyBCg2u2FLceKPch4M.P1Eawj9UB/kQYRu5q2q','USER','2025-12-03 19:33:08'),(5,'neizow','qqqdfqf','test@novaparty.xyz','$2b$10$ho7xOG7Gqe8W8kPjM3oSkOZlr7VHa818Ze2wEu6EGodnKMkcTOmrq','USER','2025-12-08 18:52:36'),(6,'ee','ee','test2@novaparty.xyz','$2b$10$wQR39xdeoOIn7XqbauIE.OqOVVvMh99M.ekNG3TZyhNWfKIyfu/LG','USER','2025-12-08 18:55:40'),(7,'zzz','zzz','test3@novaparty.xyz','$2b$10$ngCHyeidwrvAoZo4FjRaNe62ppW7a7Q81054sBPpJt5NWFrCEKcZ6','USER','2025-12-08 18:56:28'),(8,'aafa','qzdfqfz','qsfffzfq@zfqff.com','$2b$10$mFl/IyUbh/YKFkHCuqCyyuSbGfR4qebU7izxpdf8To5T51Z5GCaJ6','USER','2025-12-08 18:57:02'),(9,'qzfdq','qfqf','qfzzqf@qzfqf.com','$2b$10$7vYG9v5VgVaUMhuhtgWZbeiPehkRaBCy5OSpIWJNf0GeCF4pUVfxS','USER','2025-12-08 18:59:41'),(10,'zzzzt','esg','quentin@novaparty.xyz','$2b$10$9yF3LDxFRD3kQ.EI7.EdGOxUDBawCQ1NtGwFSdxwE9HCuhKl6rEM6','USER','2025-12-08 19:00:08'),(11,'dqqzd','qsddzq','lab@novaparty.xyz','$2b$10$8nDg0Oo8iWHaNSyaD9ync.5hcISSOneZIFE65lelx6eYIA93vaR/C','USER','2025-12-08 19:04:13'),(12,'qzd','zqd','zizi@c.com','$2b$10$gza8bjoYbQ2srahCDYH4veCgdd1ETpNBhM6Z7hk4MqapAi9E8sUYu','USER','2025-12-08 19:05:30'),(13,'qzd','zqd','zizi2@c.com','$2b$10$euZQv.K8YY85Tmq0pZk7wO6pWeE4nj51eaVA2oDqCqU47nAxG7O0m','USER','2025-12-08 19:05:47'),(14,'qqdfq','qsddz','oui@c.com','$2b$10$iimVPfVIn7nOCcW2PMHyR.tt6IGOM3LQmza61Xr.pwncSDuN3fBSC','USER','2025-12-08 19:13:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12 19:54:04
