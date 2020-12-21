-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-12-2020 a las 14:36:30
-- Versión del servidor: 8.0.22
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ethicalchoice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Favs`
--
DROP DATABASE IF EXISTS ethicalChoice2;
CREATE DATABASE ethicalChoice2;
USE ethicalChoice2;
CREATE TABLE `Favs` (
  `idFavs` int NOT NULL,
  `idUser` int NOT NULL,
  `idProduct` int NOT NULL
);

--
-- Volcado de datos para la tabla `Favs`
--

INSERT INTO `Favs` (`idFavs`, `idUser`, `idProduct`) VALUES
(4, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Folder`
--

CREATE TABLE `Folder` (
  `idFolder` int NOT NULL,
  `Name_Folder` varchar(50) NOT NULL,
  `id_User` int NOT NULL DEFAULT '0'
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FolderFavs`
--

CREATE TABLE `FolderFavs` (
  `idFoldFavs` int NOT NULL,
  `id_User` int NOT NULL DEFAULT '0',
  `id_Favs` int NOT NULL DEFAULT '0',
  `id_Folder` int NOT NULL DEFAULT '0',

  PRIMARY KEY (idFolderFavs);
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Products`
--

CREATE TABLE `Products` (
  `idProduct` int NOT NULL,
  `Bar_code` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Retailer` int NOT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Ingredients` varchar(1000) DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `Vegan` tinyint NOT NULL,
  `Cruelty_free` tinyint NOT NULL
);

--
-- Volcado de datos para la tabla `Products`
--

INSERT INTO `Products` (`idProduct`, `Bar_code`, `Name`, `Brand`, `Retailer`, `Category`, `Description`, `Ingredients`, `Picture`, `Vegan`, `Cruelty_free`) VALUES
(1, 2233134, 'Acondicionador para cabello débil Hydro Volumen', 'Natura Siberica', 1, 'acondicionador', 'En SUPER SIBERICA, las poderosas e icónicas plantas siberianas se combinan con tecnologías innovadoras. ', 'Aqua, Cetearyl Alcohol, Cetrimonium Chloride, Bis-Cetearyl Amodimethicone, Pinus Sibirica Needle Water(WH), Rosa Davurica Leaf Extract(WH), Hydrolyzed Rice Protein, Hydrolyzed Wheat Protein, Juniperus Communis Branch/Fruit/Leaf Extract(WH), Rhodiola Rosea Root Extract*, Urtica Dioica Leaf Extract(WH), Avena Sativa Kernel Extract*, Pulmonaria Officinalis Extract*, Panthenol, Guar Hydroxypropyltrimonium Chloride, Dimethicone, Phenyl Trimethicone, Dimethiconol, Lauryl Glucoside, Sodium Hyaluronate, Abies Sibirica Needle Oil, Pinus Sylvestris Leaf Oil, Glycerin, Citric Acid, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate, Benzoic Acid, Sorbic Acid, Parfum, CI 15985, CI 19140, Citronellol, Hexyl Cinnamal, Limonene, Phenetyl Alcohol.', 'https://naturasibericatienda.com/img/productos/id_360/360_1.jpg', 0, 1),
(2, 45467887, 'Crema facial anti-age caviar de rusia', 'Natura Siberica', 1, 'crema', 'Esta crema facial nutre intensamente la piel y le proporciona suavidad y confort. Tiene un efecto rejuvenecedor y realza la juventud y el brillo natural de la piel así que es ideal para prevenir el envejecimiento y dotar la piel de todos los nutrientes necesarios.', 'Aqua, Octyldodecanol, Dicaprylyl Ether, Glyceryl Stearate, Cetearyl Alcohol, Glycerin, Panthenol, Triticum Vulgare Germ Oil, Butyrospermum Parkii Butter, Glyceryl Linoleate, Glyceryl Oleate, Glyceryl Linolenate, Sodium Hyaluronate, Tocopheryl Acetate, Caviar Extract, Prunus Persica Leaf Extract, Alaria Esculenta Extract**, Rhodiola Rosea Root Extract WH*, Sorbus Aucuparia Fruit Extract WH*, Juniperus Sibirica Needle Extract WH*, Flavocetraria Nivalis Extract WH*, Pinus Sibirica Needle Extract WH*, Hesperis Sibirica Flower/Leaf/Stem Extract WH*, Agrostis Stolonifera Extract WH*, Panax Ginseng Root Extract*, Zingiber Officinalis Root Extract*, Sodium Carbomer, Palmitoyl Tripeptide-5, Sodium Ascorbyl Phosphate, Sodium Steaoryl Glutamate, Benzyl Alcohol, Ethylhexylglycerin, Parfum, Citric Acid, Ci 28440, Ci 42051.', 'https://naturasibericatienda.com/img/productos/id_224/1.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Retailer`
--

CREATE TABLE `Retailer` (
  `idRetailer` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Phone` int NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Coordinates` int DEFAULT NULL
);

--
-- Volcado de datos para la tabla `Retailer`
--

INSERT INTO `Retailer` (`idRetailer`, `Name`, `Address`, `Phone`, `Email`, `Coordinates`) VALUES
(1, 'Natura Siberica', 'Avinguda Diagonal 472', 933284480, 'info@naturasibericatienda.com', 123423),
(2, 'Herbolario Doemi', 'Plaza de Pedro Zerolo, 11', 915320533, 'info@herdoemi.com', 56789),
(3, 'Herbolario La Fuente', 'Calle Pelayo, 70', 913081398, 'info@herblafuente.com', 10111213),
(4, 'Herbolario Navarro', 'Calle de Alcalá, 131', 914266898, 'info@herbnavarro.com', 14151617);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Stock`
--

CREATE TABLE `Stock` (
  `id` int NOT NULL,
  `id_retailer` int NOT NULL DEFAULT '0',
  `id_product` int NOT NULL DEFAULT '0'
);

--
-- Volcado de datos para la tabla `Stock`
--

INSERT INTO `Stock` (`id`, `id_retailer`, `id_product`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2),
(5, 3, 1),
(6, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User`
--

CREATE TABLE `User` (
  `idUser` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Avatar` varchar(500) DEFAULT NULL,
  `Surname` varchar(50) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `User`
--

INSERT INTO `User` (`idUser`, `Name`, `Password`, `Email`, `Avatar`, `Surname`) VALUES
(1, 'Luis', 'Ab123', 'luisvegasmenchero@gmail.com', NULL, 'Vegas'),
(2, 'Tamara', '15bR3', 'tama@gmail.com', NULL, 'Ocaña'),
(3, 'David ', 'Ab123', 'david@gmail.com', NULL, 'Alonso'),
(4, 'Lily ', 'Ab123', 'lily@gmail.com', NULL, 'Matias'),
(5, 'Tauana ', 'Ab123', 'tau@gmail.com', NULL, 'Matias'),
(6, 'Brady ', 'Ab123', 'brady@gmail.com', NULL, 'Vegas'),
(7, 'Encarnación ', 'Ab123', 'e.menchero@gmail.com', NULL, 'Menchero'),
(8, 'Eduardo ', 'Ab123', 'edu@gmail.com', NULL, 'Lobo'),
(9, 'Fernando ', 'Fa2021', 'fa@gmail.com', NULL, 'Alonso'),
(10, 'Sophia', 'Tv2024', 'somv@gmail.com', NULL, 'Matias'),
(11, 'Lucas', 'Lv2026', 'lvm@gmail.com', NULL, 'Vegas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Favs`
--
ALTER TABLE `Favs`
  ADD PRIMARY KEY (`idFavs`),
  ADD KEY `idProduct` (`idProduct`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `Folder`
--
ALTER TABLE `Folder`
  ADD PRIMARY KEY (`idFolder`),
  ADD KEY `id_User` (`id_User`);

--
-- Indices de la tabla `FolderFavs`
--
ALTER TABLE `FolderFavs`
  ADD PRIMARY KEY (`idFoldFavs`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Favs` (`id_Favs`),
  ADD KEY `id_Folder` (`id_Folder`);

--
-- Indices de la tabla `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`idProduct`,`Retailer`),
  ADD KEY `Retailer` (`Retailer`);

--
-- Indices de la tabla `Retailer`
--
ALTER TABLE `Retailer`
  ADD PRIMARY KEY (`idRetailer`);

--
-- Indices de la tabla `Stock`
--
ALTER TABLE `Stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_retailer` (`id_retailer`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Favs`
--
ALTER TABLE `Favs`
  MODIFY `idFavs` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Folder`
--
ALTER TABLE `Folder`
  MODIFY `idFolder` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `FolderFavs`
--
ALTER TABLE `FolderFavs`
  MODIFY `idFoldFavs` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Products`
--
ALTER TABLE `Products`
  MODIFY `idProduct` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Retailer`
--
ALTER TABLE `Retailer`
  MODIFY `idRetailer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Stock`
--
ALTER TABLE `Stock`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `User`
--
ALTER TABLE `User`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Favs`
--
ALTER TABLE `Favs`
  ADD CONSTRAINT `Favs_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `Products` (`idProduct`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Favs_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `User` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Folder`
--
ALTER TABLE `Folder`
  ADD CONSTRAINT `Folder_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `User` (`idUser`);

--
-- Filtros para la tabla `FolderFavs`
--
ALTER TABLE `FolderFavs`
  ADD CONSTRAINT `FolderFavs_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `User` (`idUser`),
  ADD CONSTRAINT `FolderFavs_ibfk_2` FOREIGN KEY (`id_Favs`) REFERENCES `Favs` (`idFavs`),
  ADD CONSTRAINT `FolderFavs_ibfk_3` FOREIGN KEY (`id_Folder`) REFERENCES `Folder` (`idFolder`);

--
-- Filtros para la tabla `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`Retailer`) REFERENCES `Retailer` (`idRetailer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Stock`
--
ALTER TABLE `Stock`
  ADD CONSTRAINT `Stock_ibfk_1` FOREIGN KEY (`id_retailer`) REFERENCES `Retailer` (`idRetailer`),
  ADD CONSTRAINT `Stock_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `Products` (`idProduct`);
COMMIT;

--
-- Tabla 'UserGoogle' --
-- Modificación límite números --

ALTER TABLE `ethicalChoice`.`UserGoogle` 
DROP FOREIGN KEY `UserGoogle_ibfk_1`;
ALTER TABLE `ethicalChoice`.`UserGoogle` 
CHANGE COLUMN `idUser` `idUser` INT(50) NOT NULL DEFAULT '0' ;
ALTER TABLE `ethicalChoice`.`UserGoogle` 
ADD CONSTRAINT `UserGoogle_ibfk_1`
  FOREIGN KEY (`idUser`)
  REFERENCES `ethicalChoice`.`User` (`idUser`);

--
-- Tabla 'UserFacebook' --
CREATE TABLE UserFacebook ( 
  idUser INT NOT NULL DEFAULT 0, 
  idFacebook INT(50) NOT NULL DEFAULT 0,  
  PRIMARY KEY (idUser), 
  FOREIGN KEY (idUser) REFERENCES User (idUser))

--
-- Tabla 'UserRegister' --
CREATE TABLE UserRegister (
idUser INT NOT NULL DEFAULT 0,
Password VARCHAR(50) NOT NULL, 
Salt VARCHAR (60) NOT NULL
);
-- Table 'UserRegister' Modify --
ALTER TABLE `ethicalChoice`.`UserRegister` 
DROP COLUMN `Salt`,
CHANGE COLUMN `Password` `HashPass` VARCHAR(50) NOT NULL ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
