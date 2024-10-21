-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2024 at 02:24 PM
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
  `user_id` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `filename` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`user_id`, `username`, `email`, `password`, `type`, `filename`) VALUES
('002cf3a9-792f-498f-ba57-40dbf0aab8fd', 'admin17', 'admin@gmail.com', 'sha1$79cc32cb$1$8c421ccd655abe3570dbf47cabf1a2986e9e223b', 'admin', '1728202089909.png'),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', 'edmar22', 'scholarsoftabukcity@gmail.com', 'sha1$2de89338$1$16103b41affb1aac3583897804928bb58b3693e3', 'user', '1728235909292.png');

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
  `file_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `date`, `time`, `file_path`, `file_id`) VALUES
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
(150, '1728379573764.pdf', '2024-10-08', '17:26:13', '/uploads/1728379573764.pdf', 'Ik7bucPI'),
(151, '1729068116278.JPG', '2024-10-16', '16:41:56', '/uploads/1729068116278.JPG', '4e977097-4'),
(152, '1729068148511.JPG', '2024-10-16', '16:42:28', '/uploads/1729068148511.JPG', 'ee59489f-42fe-4344-a41d-2955d4d9acc6'),
(153, '1729068366612.JPG', '2024-10-16', '16:46:06', '/uploads/1729068366612.JPG', '28b5887a-e51c-49ef-8587-4643907820b7'),
(154, '1729068598450.JPG', '2024-10-16', '16:49:58', '/uploads/1729068598450.JPG', 'addc33cd-9200-44e4-8cbd-137059c9f4fe'),
(155, '1729069501462.JPG', '2024-10-16', '17:05:01', '/uploads/1729069501462.JPG', '04ad0a3f-cd7e-494c-bcba-c9e1f0caef4a'),
(156, '1729127042401.pdf', '2024-10-17', '09:04:02', '/uploads/1729127042401.pdf', '0e7960f4-0524-424e-a793-6ac06c4f80fa'),
(157, '1729127042423.pdf', '2024-10-17', '09:04:02', '/uploads/1729127042423.pdf', '0e7960f4-0524-424e-a793-6ac06c4f80fa'),
(158, '1729127042481.pdf', '2024-10-17', '09:04:02', '/uploads/1729127042481.pdf', '0e7960f4-0524-424e-a793-6ac06c4f80fa'),
(159, '1729127042493.pdf', '2024-10-17', '09:04:02', '/uploads/1729127042493.pdf', '0e7960f4-0524-424e-a793-6ac06c4f80fa'),
(160, '1729127042505.pdf', '2024-10-17', '09:04:02', '/uploads/1729127042505.pdf', '0e7960f4-0524-424e-a793-6ac06c4f80fa'),
(161, '1729127141123.pdf', '2024-10-17', '09:05:41', '/uploads/1729127141123.pdf', '5834ae6a-f335-46fb-bd61-181793111122'),
(162, '1729127141146.pdf', '2024-10-17', '09:05:41', '/uploads/1729127141146.pdf', '5834ae6a-f335-46fb-bd61-181793111122'),
(163, '1729127141197.pdf', '2024-10-17', '09:05:41', '/uploads/1729127141197.pdf', '5834ae6a-f335-46fb-bd61-181793111122'),
(164, '1729127141206.pdf', '2024-10-17', '09:05:41', '/uploads/1729127141206.pdf', '5834ae6a-f335-46fb-bd61-181793111122'),
(165, '1729127141222.pdf', '2024-10-17', '09:05:41', '/uploads/1729127141222.pdf', '5834ae6a-f335-46fb-bd61-181793111122'),
(166, '1729127389452.pdf', '2024-10-17', '09:09:49', '/uploads/1729127389452.pdf', '3320dd6c-6aab-4a76-b040-05900e9c1bef'),
(167, '1729127389482.pdf', '2024-10-17', '09:09:49', '/uploads/1729127389482.pdf', '3320dd6c-6aab-4a76-b040-05900e9c1bef'),
(168, '1729127389499.pdf', '2024-10-17', '09:09:49', '/uploads/1729127389499.pdf', '3320dd6c-6aab-4a76-b040-05900e9c1bef'),
(169, '1729127389506.pdf', '2024-10-17', '09:09:49', '/uploads/1729127389506.pdf', '3320dd6c-6aab-4a76-b040-05900e9c1bef'),
(170, '1729127389525.pdf', '2024-10-17', '09:09:49', '/uploads/1729127389525.pdf', '3320dd6c-6aab-4a76-b040-05900e9c1bef'),
(171, '1729127879148.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879148.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb'),
(172, '1729127879207.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879207.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb'),
(173, '1729127879230.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879230.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb'),
(174, '1729127879236.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879236.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb'),
(175, '1729127879258.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879258.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
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
  `mother_voting_years` varchar(10) NOT NULL,
  `father_firstname` varchar(50) DEFAULT NULL,
  `father_middlename` varchar(50) DEFAULT NULL,
  `father_lastname` varchar(50) DEFAULT NULL,
  `father_current_address` varchar(255) DEFAULT NULL,
  `father_permanent_address` varchar(255) DEFAULT NULL,
  `father_contact_number` varchar(20) DEFAULT NULL,
  `father_registered_voter` tinyint(1) DEFAULT NULL,
  `father_voting_years` varchar(10) NOT NULL,
  `coe_file` varchar(200) NOT NULL,
  `brgy_indigency` varchar(200) NOT NULL,
  `cog_file` varchar(200) NOT NULL,
  `school_id` varchar(200) NOT NULL,
  `parent_id` varchar(200) NOT NULL,
  `profile_picture` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `firstname`, `middlename`, `lastname`, `birthdate`, `gender`, `civil_status`, `current_address`, `permanent_address`, `contact`, `mother_firstname`, `mother_middlename`, `mother_lastname`, `mother_current_address`, `mother_permanent_address`, `mother_contact_number`, `mother_registered_voter`, `mother_voting_years`, `father_firstname`, `father_middlename`, `father_lastname`, `father_current_address`, `father_permanent_address`, `father_contact_number`, `father_registered_voter`, `father_voting_years`, `coe_file`, `brgy_indigency`, `cog_file`, `school_id`, `parent_id`, `profile_picture`, `status`) VALUES
('fe0ebeae-85fe-441a-a646-efe88cdcfce1', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', 'mark', 'hilario', 'reyes', '2024-10-04', 'male', 'single', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 'rome', 'jiohn', 'reyes', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 0, '6', 'shine', 'marie', 'reyes', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 0, '3', '1729127389452.pdf', '1729127389482.pdf', '1729127389499.pdf', '1729127389525.pdf', '1729127389506.pdf', '1728202089909.png', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
