-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: tallerdb
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `CODIGOMARCA` varchar(10) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  PRIMARY KEY (`CODIGOMARCA`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES ('1','Chevrolet');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modelo` (
  `CODIGOMODELO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) NOT NULL,
  `CODIGOMARCA` varchar(10) NOT NULL,
  PRIMARY KEY (`CODIGOMODELO`),
  KEY `FK_CODIGOMARCA_idx` (`CODIGOMARCA`),
  CONSTRAINT `FK_CODIGOMARCA` FOREIGN KEY (`CODIGOMARCA`) REFERENCES `marca` (`CODIGOMARCA`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (2,'Aveo','1');
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propietario`
--

DROP TABLE IF EXISTS `propietario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propietario` (
  `CODIGOPROPIETARIO` int(11) NOT NULL AUTO_INCREMENT,
  `CEDULA` char(10) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  `FECHANACIMIENTO` date NOT NULL,
  PRIMARY KEY (`CODIGOPROPIETARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propietario`
--

LOCK TABLES `propietario` WRITE;
/*!40000 ALTER TABLE `propietario` DISABLE KEYS */;
/*!40000 ALTER TABLE `propietario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculo` (
  `CODIGOVEHICULO` int(11) NOT NULL AUTO_INCREMENT,
  `CODIGOMARCA` varchar(10) NOT NULL,
  `CODIGOMODELO` int(11) NOT NULL,
  `CODIGOPROPIETARIO` int(11) NOT NULL,
  `PLACA` char(7) NOT NULL,
  `ANIO` int(11) NOT NULL,
  `MOTOR` decimal(4,0) NOT NULL,
  `TRANSMISION` varchar(3) NOT NULL,
  PRIMARY KEY (`CODIGOVEHICULO`),
  KEY `FK_REFERENCE_3` (`CODIGOMODELO`),
  KEY `FK_REFERENCE_4` (`CODIGOPROPIETARIO`),
  KEY `FK_CODMARCA2_idx` (`CODIGOMARCA`),
  CONSTRAINT `FK_CODMARCA2` FOREIGN KEY (`CODIGOMARCA`) REFERENCES `marca` (`CODIGOMARCA`),
  CONSTRAINT `FK_REFERENCE_3` FOREIGN KEY (`CODIGOMODELO`) REFERENCES `modelo` (`CODIGOMODELO`),
  CONSTRAINT `FK_REFERENCE_4` FOREIGN KEY (`CODIGOPROPIETARIO`) REFERENCES `propietario` (`CODIGOPROPIETARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-14 19:23:12
