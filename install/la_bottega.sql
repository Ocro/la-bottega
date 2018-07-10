#
# DUMP FILE
#
# Database is ported from MS Access
#------------------------------------------------------------------
# Created using "MS Access to MySQL" form http://www.bullzip.com
# Program Version 5.5.282
#
# OPTIONS:
#   sourcefilename=C:/Users/david/Downloads/Jon's Haircut 2011.mdb
#   sourceusername=
#   sourcepassword=
#   sourcesystemdatabase=
#   destinationdatabase=la_bottega
#   storageengine=InnoDB
#   dropdatabase=0
#   createtables=1
#   unicode=1
#   autocommit=1
#   transferdefaultvalues=1
#   transferindexes=1
#   transferautonumbers=1
#   transferrecords=0
#   columnlist=1
#   tableprefix=
#   negativeboolean=0
#   ignorelargeblobs=0
#   memotype=
#   datetimetype=
#

CREATE DATABASE IF NOT EXISTS `la_bottega`;
USE `la_bottega`;

#
# Table structure for table 'Clients'
#

DROP TABLE IF EXISTS `Clients`;

CREATE TABLE `Clients` (
  `ClientID` INTEGER NOT NULL AUTO_INCREMENT, 
  `Nom` VARCHAR(50), 
  `Prénom` VARCHAR(50), 
  `N° Téléphone` VARCHAR(50), 
  `Adresse` VARCHAR(50), 
  `Code Postale` INTEGER DEFAULT 0, 
  `Ville` VARCHAR(50), 
  INDEX (`Nom`), 
  INDEX (`Code Postale`), 
  PRIMARY KEY (`ClientID`)
) ENGINE=innodb DEFAULT CHARSET=utf8;

#
# Table structure for table 'Services'
#

DROP TABLE IF EXISTS `Services`;

CREATE TABLE `Services` (
  `ServiceID` INTEGER NOT NULL AUTO_INCREMENT, 
  `Service` VARCHAR(50), 
  `Prix` INTEGER DEFAULT 0, 
  PRIMARY KEY (`ServiceID`), 
  INDEX (`Service`)
) ENGINE=innodb DEFAULT CHARSET=utf8;

#
# Table structure for table 'Visites'
#

DROP TABLE IF EXISTS `Visites`;

CREATE TABLE `Visites` (
  `VisiteID` INTEGER NOT NULL AUTO_INCREMENT, 
  `ClientID` INTEGER DEFAULT 0, 
  `Date` DATETIME, 
  PRIMARY KEY (`VisiteID`), 
  UNIQUE (`VisiteID`), 
  INDEX (`ClientID`)
) ENGINE=innodb DEFAULT CHARSET=utf8;

#
# Table structure for table 'VisitesDetail'
#

DROP TABLE IF EXISTS `VisitesDetail`;

CREATE TABLE `VisitesDetail` (
  `VisiteID` INTEGER NOT NULL DEFAULT 0, 
  `ServiceID` INTEGER NOT NULL DEFAULT 0, 
  `Prix` INTEGER DEFAULT 0, 
  `Couleur` VARCHAR(50), 
  `Remarque` VARCHAR(50), 
  PRIMARY KEY (`VisiteID`, `ServiceID`), 
  INDEX (`VisiteID`), 
  INDEX (`ServiceID`)
) ENGINE=innodb DEFAULT CHARSET=utf8;

