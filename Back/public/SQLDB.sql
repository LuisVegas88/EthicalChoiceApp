
USE `ethicalchoice` ;

-- -----------------------------------------------------
-- Table `ethicalchoice`.`Retailer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Retailer` (
  `idRetailer` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Address` VARCHAR(50) NOT NULL,
  `Coordinates` POINT NOT NULL,
  `Phone` INT NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  
  PRIMARY KEY (`idRetailer`)
);


-- -----------------------------------------------------
-- Table `ethicalchoice`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Products` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `Bar_code` INT NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Vegan` BIT(1) NOT NULL,
  `Cruelty_free` BIT(1) NULL,
  `Quantity/unit` INT NULL,
  `Brand` VARCHAR(50) NULL,
  `Retailer` INT NOT NULL,
  `Category` VARCHAR(50) NULL,
  `Description` VARCHAR(1000) NULL,
  `Ingredients` VARCHAR(1000) NULL,
  `Picture` VARCHAR(255) NULL,

  PRIMARY KEY (`idProduct`, `Retailer`),
  FOREIGN KEY (`Retailer`)
  REFERENCES `Retailer` (`idRetailer`)
  ON UPDATE CASCADE
  ON DELETE CASCADE 
);

-- 
-- -----------------------------------------------------
-- Table `ethicalchoice`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User`(
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Avatar` LONGBLOB NULL,

  PRIMARY KEY (`idUser`)
);


-- -----------------------------------------------------
-- Table `ethicalchoice`.`Favs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Favs` (
  `idFavs` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idProduct` INT NOT NULL,
  
  PRIMARY KEY (`idFavs`),
  FOREIGN KEY (`idProduct`)
    REFERENCES `Product` (`idProduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  FOREIGN KEY (`idUser`)
    REFERENCES `User` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- ///lo saco fuera porque creo que no hace falta
`idRetailer` INT NOT NULL,

FOREIGN KEY (`idRetailer`)
    REFERENCES `Retailer` (`idRetailer`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,