-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2024 at 02:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scholarship-management-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `filename` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `firstname`, `middlename`, `lastname`, `email`, `password`, `type`, `filename`) VALUES
(22, 'Edmar', 'Reyes', 'Pajares', 'admin@gmail.com', 'sha1$2de89338$1$16103b41affb1aac3583897804928bb58b3693e3', 'admin', '1728202089909.png'),
(23, 'juan', 'dela', 'cruz', 'scholarsoftabukcity@gmail.com', 'sha1$2de89338$1$16103b41affb1aac3583897804928bb58b3693e3', 'user', '1728235909292.png'),
(24, 'rumar', 'dacasc', 'dasds', 'pamparor@gmail.com', 'sha1$39c25d58$1$91f3d82f37caa8f0b018c71f5c012c358ac89eaf', 'user', '1728379562499.jfif'),
(25, 'rumar', 'dacasc', 'dasds', 'pamparor@gmail.com', 'sha1$e2fd6612$1$4786624316308ca294e08cd9e81a5595cbe884c2', 'user', '1728379573717.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `fileID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `date`, `time`, `file_path`, `fileID`) VALUES
(32, '1728235909298.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909298.pdf', 'aOpwchoT'),
(33, '1728235909302.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909302.pdf', 'aOpwchoT'),
(34, '1728235909304.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909304.pdf', 'aOpwchoT'),
(35, '1728235909308.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909308.pdf', 'aOpwchoT'),
(36, '1728235909321.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909321.pdf', 'aOpwchoT'),
(37, '1728202089909.png', '2024-10-06', '10:24:05', '/uploads/1728202089909.png', 'cvnqQcnO'),
(38, '1728235909292.png', '2024-10-06', '10:24:05', '/uploads/1728235909292.png', 'cvnqQcnO'),
(139, '1728379562499.jfif', '2024-10-08', '17:26:02', '/uploads/1728379562499.jfif', 'TUvf9eXv'),
(140, '1728379562499.pdf', '2024-10-08', '17:26:02', '/uploads/1728379562499.pdf', 'TUvf9eXv'),
(141, '1728379562534.pdf', '2024-10-08', '17:26:02', '/uploads/1728379562534.pdf', 'TUvf9eXv'),
(142, '1728379562541.pdf', '2024-10-08', '17:26:02', '/uploads/1728379562541.pdf', 'TUvf9eXv'),
(143, '1728379562548.pdf', '2024-10-08', '17:26:02', '/uploads/1728379562548.pdf', 'TUvf9eXv'),
(144, '1728379562556.pdf', '2024-10-08', '17:26:02', '/uploads/1728379562556.pdf', 'TUvf9eXv'),
(145, '1728379573717.jfif', '2024-10-08', '17:26:13', '/uploads/1728379573717.jfif', 'Ik7bucPI'),
(146, '1728379573717.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573717.pdf', 'Ik7bucPI'),
(147, '1728379573736.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573736.pdf', 'Ik7bucPI'),
(148, '1728379573740.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573740.pdf', 'Ik7bucPI'),
(149, '1728379573750.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573750.pdf', 'Ik7bucPI'),
(150, '1728379573764.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573764.pdf', 'Ik7bucPI');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `contact` varchar(20) NOT NULL,
  `mother_firstname` varchar(50) DEFAULT NULL,
  `mother_middlename` varchar(50) DEFAULT NULL,
  `mother_lastname` varchar(50) DEFAULT NULL,
  `mother_current_address` varchar(255) DEFAULT NULL,
  `mother_permanent_address` varchar(255) DEFAULT NULL,
  `mother_contact_number` varchar(20) DEFAULT NULL,
  `mother_registered_voter` tinyint(1) DEFAULT NULL,
  `father_firstname` varchar(50) DEFAULT NULL,
  `father_middlename` varchar(50) DEFAULT NULL,
  `father_lastname` varchar(50) DEFAULT NULL,
  `father_current_address` varchar(255) DEFAULT NULL,
  `father_permanent_address` varchar(255) DEFAULT NULL,
  `father_contact_number` varchar(20) DEFAULT NULL,
  `father_registered_voter` tinyint(1) DEFAULT NULL,
  `coe_file` varchar(200) NOT NULL,
  `brgy_indigency` varchar(200) NOT NULL,
  `cog_file` varchar(200) NOT NULL,
  `school_id` varchar(200) NOT NULL,
  `parent_id` varchar(200) NOT NULL,
  `profilePic` varchar(200) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `firstname`, `middlename`, `lastname`, `birthdate`, `gender`, `civil_status`, `current_address`, `permanent_address`, `contact`, `mother_firstname`, `mother_middlename`, `mother_lastname`, `mother_current_address`, `mother_permanent_address`, `mother_contact_number`, `mother_registered_voter`, `father_firstname`, `father_middlename`, `father_lastname`, `father_current_address`, `father_permanent_address`, `father_contact_number`, `father_registered_voter`, `coe_file`, `brgy_indigency`, `cog_file`, `school_id`, `parent_id`, `profilePic`, `status`) VALUES
(24, 'juan', 'dela', 'cruz', '2000-01-02', 'male', 'single', 'SAN GABRIEL', 'san gabriel tuguegarao city cagayan', '09123456789', 'Juliet', 'reyes', 'dela', 'san gabriel tuguegarao city cagayan', 'san gabriel tuguegarao city cagayan', '09123456789', 0, 'ANTHONY', 'perez', 'cruz', 'san gabriel tuguegarao city cagayan', 'san gabriel tuguegarao city cagayan', '09789456132', 0, '1728235909298.pdf', '1728235909302.pdf', '1728235909304.pdf', '1728235909321.pdf', '1728235909308.pdf', '1728235909292.png', 'pending'),
(25, 'rumar', 'dacasc', 'dasds', '2024-10-09', 'male', 'single', 'dasds', 'asdasdsd', '2098451', 'sdasd', 'dasdas', 'dasdasds', 'dasdasd', 'asdasds', '08988455626456', 0, 'asdasd', 'asdas', 'dasdasd', 'dasdasd', 'asdasdas', '09666666565', 0, '1728379562499.pdf', '1728379562534.pdf', '1728379562541.pdf', '1728379562556.pdf', '1728379562548.pdf', '1728379562499.jfif', ''),
(26, 'rumar', 'dacasc', 'dasds', '2024-10-09', 'male', 'single', 'dasds', 'asdasdsd', '2098451', 'sdasd', 'dasdas', 'dasdasds', 'dasdasd', 'asdasds', '08988455626456', 0, 'asdasd', 'asdas', 'dasdasd', 'dasdasd', 'asdasdas', '09666666565', 0, '1728379573717.pdf', '1728379573736.pdf', '1728379573740.pdf', '1728379573764.pdf', '1728379573750.pdf', '1728379573717.jfif', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;