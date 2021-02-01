--
-- Base de datos: `ethicalchoice`
--
​
-- --------------------------------------------------------
​
​
DROP DATABASE IF EXISTS ethicalChoice2;
CREATE DATABASE ethicalChoice2;
USE ethicalChoice2;
​
--
-- Estructura de tabla para la tabla `Folder`
--
​
CREATE TABLE `Folder` (
  `idFolder` int NOT NULL AUTO_INCREMENT,
  `Name_Folder` varchar(50) NOT NULL,
​
  PRIMARY KEY (idFolder)
);
​
-- --------------------------------------------------------
​
--
-- Estructura de tabla para la tabla `Products`
--
​
CREATE TABLE `Products` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `Bar_code` int NOT NULL,
  `Name` varchar(1000) NOT NULL,
  `Brand` varchar(1000) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Description` varchar(10000) DEFAULT NULL,
  `Ingredients` varchar(2000) DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `Price` varchar(50) DEFAULT NULL,
  `Sello` varchar(1000) DEFAULT NULL,
  `Vegan` tinyint(4) NOT NULL,
  `Cruelty_free` tinyint(4) NOT NULL,
  `Eco` tinyint(4) NOT NULL,
​
  PRIMARY KEY (idProduct)
);
​
-- --------------------------------------------------------
​
--
-- Estructura de tabla para la tabla `Retailer`
--
​
CREATE TABLE `Retailer` (
  `idRetailer` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Phone` int NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Lat` float NOT NULL,
  `Lon` float NOT NULL,
​
  PRIMARY KEY (idRetailer)
);
​
-- --------------------------------------------------------
​
--
-- Estructura de tabla para la tabla `User`
--
​
CREATE TABLE `User` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Avatar` varchar(500) DEFAULT NULL,
  `Surname` varchar(50) DEFAULT NULL,
​
  PRIMARY KEY (idUser)
);
​
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `Favs`
--
​
CREATE TABLE `Favs` (
  `idFavs` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `idProduct` int NOT NULL,
​
  PRIMARY KEY (idFavs),
  FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idProduct) REFERENCES Products (idProduct) ON DELETE CASCADE ON UPDATE CASCADE
);
​
​
​
​
-- --------------------------------------------------------
​
--
-- Estructura de tabla para la tabla `FolderFavs`
--
​
CREATE TABLE `FolderFavs` (
  `idFavs` int NOT NULL,
  `idFolder` int NOT NULL,
​
  FOREIGN KEY (idFavs) REFERENCES Favs (idFavs) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idFolder) REFERENCES Folder (idFolder) ON DELETE CASCADE ON UPDATE CASCADE
);
​
-- --------------------------------------------------------
​
--
-- Estructura de tabla para la tabla `Stock`
--
​
CREATE TABLE `Stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_retailer` int NOT NULL DEFAULT '0',
  `id_product` int NOT NULL DEFAULT '0',
​
  PRIMARY KEY (id),
  FOREIGN KEY (id_retailer) REFERENCES Retailer (idRetailer) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_product) REFERENCES Products (idProduct) ON DELETE CASCADE ON UPDATE CASCADE
);
​
-- Tabla Google
CREATE TABLE UserGoogle (
  idUser INT NOT NULL DEFAULT 0,
  idGoogle INT(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (idUser),
  FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);
​
--
-- Tabla 'UserFacebook' --
CREATE TABLE UserFacebook (
  idUser INT NOT NULL DEFAULT 0,
  idFacebook INT(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (idUser),
  FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);
​
--
-- Tabla 'UserRegister' --
CREATE TABLE UserRegister (
  idUser INT NOT NULL DEFAULT 0,
  HashPass VARCHAR(50) NOT NULL,
​
  FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE ON UPDATE CASCADE
);
​
-- Tabla UserFolder
CREATE TABLE UserFolder (
  idUser INT NOT NULL,
  idFolder INT NOT NULL,
​
  FOREIGN KEY (idUser) REFERENCES User (idUser) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idFolder) REFERENCES Folder (idFolder) ON DELETE CASCADE ON UPDATE CASCADE
);
​
--
-- Volcado de datos para la tabla `User`
--
​
-- INSERT INTO `User` (`idUser`, `Name`, `Email`, `Surname`) VALUES
-- (1, 'Luis', 'Ab123', 'luisvegasmenchero@gmail.com', 'Vegas'),
-- (2, 'Ana', 'Ab123', 'ana90@gmail.com',  'Sánchez'),
-- (3, 'David ', 'Ab123', 'david@gmail.com',  'Alonso'),
-- (4, 'Lily ', 'Ab123', 'lily@gmail.com',  'Matias'),
-- (5, 'Tauana ', 'Ab123', 'tau@gmail.com',  'Matias'),
-- (6, 'Brady ', 'Ab123', 'brady@gmail.com','Vegas'),
-- (7, 'Encarnación ', 'Ab123', 'e.menchero@gmail.com',  'Menchero'),
-- (8, 'Eduardo ', 'Ab123', 'edu@gmail.com',  'Lobo'),
-- (9, 'Fernando ', 'Fa2021', 'fa@gmail.com',  'Alonso'),
-- (10, 'Sophia', 'Tv2024', 'somv@gmail.com',  'Matias'),
-- (11, 'Lucas', 'Lv2026', 'lvm@gmail.com', 'Vegas');
​
--HOST_SQL=127.0.0.1
--USER_SQL=root
--PASSWORD_SQL=root
--DATABASE_SQL=ethicalchoice2