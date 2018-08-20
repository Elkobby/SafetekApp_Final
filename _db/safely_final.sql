-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2017 at 06:11 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1
-- @auther: Anhtony Mensah Addae

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safely`
--
CREATE SCHEMA IF NOT EXISTS `safely` DEFAULT CHARACTER SET utf8 ;
USE `safely` ;
-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `gId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `hostel`
--

CREATE TABLE `hostel` (
  `hId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `location_lId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `hostel_has_meetpoint`
--

CREATE TABLE `hostel_has_meetpoint` (
  `hostel_hId` int(11) NOT NULL,
  `meetpoint_mId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `lId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `long` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `location_has_meetpoint`
--

CREATE TABLE `location_has_meetpoint` (
  `location_lId` int(11) NOT NULL,
  `meetpoint_mId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `meetpoint`
--

CREATE TABLE `meetpoint` (
  `mId` int(11) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `gId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `sId` int(11) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) NOT NULL,
  `referenceNumber` int(11) DEFAULT NULL,
  `indexNumber` int(11) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `hostel_hId` int(11) NOT NULL,
  `gId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aId`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`gId`);

--
-- Indexes for table `hostel`
--
ALTER TABLE `hostel`
  ADD PRIMARY KEY (`hId`,`location_lId`),
  ADD KEY `fk_hostel_location1_idx` (`location_lId`);

--
-- Indexes for table `hostel_has_meetpoint`
--
ALTER TABLE `hostel_has_meetpoint`
  ADD PRIMARY KEY (`hostel_hId`,`meetpoint_mId`),
  ADD KEY `fk_hostel_has_meetpoint_meetpoint1_idx` (`meetpoint_mId`),
  ADD KEY `fk_hostel_has_meetpoint_hostel1_idx` (`hostel_hId`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`lId`);

--
-- Indexes for table `location_has_meetpoint`
--
ALTER TABLE `location_has_meetpoint`
  ADD PRIMARY KEY (`location_lId`,`meetpoint_mId`),
  ADD KEY `fk_location_has_meetpoint_meetpoint1_idx` (`meetpoint_mId`),
  ADD KEY `fk_location_has_meetpoint_location1_idx` (`location_lId`);

--
-- Indexes for table `meetpoint`
--
ALTER TABLE `meetpoint`
  ADD PRIMARY KEY (`mId`,`gId`),
  ADD KEY `fk_meetpoint_group1_idx` (`gId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`sId`,`hostel_hId`,`gId`),
  ADD KEY `fk_student_hostel_idx` (`hostel_hId`),
  ADD KEY `fk_student_group1_idx` (`gId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `gId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `hostel`
--
ALTER TABLE `hostel`
  MODIFY `hId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `lId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `meetpoint`
--
ALTER TABLE `meetpoint`
  MODIFY `mId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `sId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `hostel`
--
ALTER TABLE `hostel`
  ADD CONSTRAINT `fk_hostel_location1` FOREIGN KEY (`location_lId`) REFERENCES `location` (`lId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `hostel_has_meetpoint`
--
ALTER TABLE `hostel_has_meetpoint`
  ADD CONSTRAINT `fk_hostel_has_meetpoint_hostel1` FOREIGN KEY (`hostel_hId`) REFERENCES `hostel` (`hId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hostel_has_meetpoint_meetpoint1` FOREIGN KEY (`meetpoint_mId`) REFERENCES `meetpoint` (`mId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `location_has_meetpoint`
--
ALTER TABLE `location_has_meetpoint`
  ADD CONSTRAINT `fk_location_has_meetpoint_location1` FOREIGN KEY (`location_lId`) REFERENCES `location` (`lId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_location_has_meetpoint_meetpoint1` FOREIGN KEY (`meetpoint_mId`) REFERENCES `meetpoint` (`mId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `meetpoint`
--
ALTER TABLE `meetpoint`
  ADD CONSTRAINT `fk_meetpoint_group1` FOREIGN KEY (`gId`) REFERENCES `group` (`gId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `fk_student_group1` FOREIGN KEY (`gId`) REFERENCES `group` (`gId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_hostel` FOREIGN KEY (`hostel_hId`) REFERENCES `hostel` (`hId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*@author Anthony Mensah Addae*/;
