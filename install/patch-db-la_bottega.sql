-- rename clients names
ALTER TABLE `clients` CHANGE `ClientID` `id` INT(11) NOT NULL AUTO_INCREMENT, CHANGE `Nom` `name` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `Prénom` `firstname` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `N° Téléphone` `phone` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `Adresse` `address` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `Code Postale` `npa` INT(11) NULL DEFAULT '0', CHANGE `Ville` `city` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

-- rename services names
ALTER TABLE `services` CHANGE `ServiceID` `id` INT(11) NOT NULL AUTO_INCREMENT, CHANGE `Service` `service` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `Prix` `price` INT(11) NULL DEFAULT '0';

-- rename appointment names
RENAME TABLE `la_bottega`.`visites` TO `la_bottega`.`appointment`;
ALTER TABLE `appointment` CHANGE `VisiteID` `idappointment` INT(11) NOT NULL AUTO_INCREMENT, CHANGE `ClientID` `idclient` INT(11) NULL DEFAULT '0', CHANGE `Date` `date` DATETIME NULL DEFAULT NULL;

-- rename appointmentdetails names
RENAME TABLE `la_bottega`.`visitesdetail` TO `la_bottega`.`appointmentdetails`;
ALTER TABLE `appointmentdetails` CHANGE `VisiteID` `idappointment` INT(11) NOT NULL DEFAULT '0', CHANGE `ServiceID` `idservice` INT(11) NOT NULL DEFAULT '0', CHANGE `Prix` `price` INT(11) NULL DEFAULT '0', CHANGE `Couleur` `color` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `Remarque` `comment` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

-- Add contraints
ALTER TABLE `appointment` ADD CONSTRAINT `FKClientId` FOREIGN KEY (`idclient`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `appointmentdetails` ADD CONSTRAINT `FKVisiteId` FOREIGN KEY (`idappointment`) REFERENCES `appointment`(`idappointment`) ON DELETE CASCADE ON UPDATE CASCADE; 
ALTER TABLE `appointmentdetails` ADD CONSTRAINT `FkServiceId` FOREIGN KEY (`idservice`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;