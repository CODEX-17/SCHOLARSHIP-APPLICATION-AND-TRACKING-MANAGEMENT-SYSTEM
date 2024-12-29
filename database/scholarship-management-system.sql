-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2024 at 10:44 PM
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
  `program_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `valid_id` varchar(200) DEFAULT NULL,
  `profile_pic` varchar(225) NOT NULL,
  `apply_status` varchar(10) DEFAULT NULL,
  `account_status` varchar(10) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`user_id`, `program_id`, `firstname`, `middlename`, `lastname`, `address`, `contact`, `email`, `password`, `type`, `valid_id`, `profile_pic`, `apply_status`, `account_status`, `reset_token`, `reset_token_expires`) VALUES
('002cf3a9-792f-498f-ba57-40dbf0aab8fd', NULL, 'Juan', 'Dela', 'Cruz', 'n/a', 'n/a', 'admin@gmail.com', 'sha1$79cc32cb$1$8c421ccd655abe3570dbf47cabf1a2986e9e223b', 'admin', NULL, 'default', NULL, 'approved', '0', '0000-00-00 00:00:00'),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'edmar', 'reyes', 'castol', 'tuguegarao', '09760202344', 'scholarsoftabukcity@gmail.com', 'sha1$0f98591f$1$b4dd81740de0b501274733952665357e5c9560ee', 'user', '1733463065738.jpg', 'default', 'applied', 'approved', NULL, '0000-00-00 00:00:00'),
('76593bc0-e0a1-4775-ab2d-20dda63b8d22', NULL, 'asdasd', 'asdasd', 'asdasd', 'asdasd', '09123334566', 'ash.ampart17@gmail.com', 'sha1$9fccdf25$1$019fb3f39f891aaa91976ba22cbcd2717459c085', 'user', '1734427135492.pdf', '1734427135513.jpg', 'free', 'approved', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `anc_id` varchar(255) NOT NULL,
  `anc_title` varchar(100) NOT NULL,
  `anc_content` varchar(255) NOT NULL,
  `anc_image` varchar(100) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`anc_id`, `anc_title`, `anc_content`, `anc_image`, `date`, `time`) VALUES
('2', 'For Scholarship new1', 'ito ay isang scholarship', '1732625903420.png', '2024-11-01', '00:00:00'),
('2c11f8ab-86fb-4b7e-a093-103325ab590f', 'sample no pic', 'sample no pic', '1732630664201.png', '2024-11-26', '22:17:44'),
('421e9ac9-1096-43c9-ba43-f092296f3bf1', 'dasds', 'sample', NULL, '2024-11-27', '09:53:52'),
('5337621d-bde2-4e4c-8433-57d1c5eadcd9', 'sample', 'sample desc', '1732630594427.png', '2024-11-26', '22:16:34'),
('774e75ef-e168-4a71-a8ff-269c81474117', 'For sale', 'get your fave flavor', NULL, '2024-11-27', '09:28:07'),
('a3d3cfa8-a67e-4786-9c9d-1fc2006f6456', 'asdsd', 'dasds', '1732672691671.jpg', '2024-11-27', '09:58:11'),
('a6cd9631-a874-4695-9889-e2144ea59610', 'test', 'test', NULL, '2024-11-27', '09:33:28'),
('af09ea88-e6a5-4e3d-bb5b-0d02faab249d', 'dasds', 'asds', NULL, '2024-11-27', '09:54:47'),
('d63602ae-916e-45e6-a074-cd648d612399', '2024 Academic Excellence Scholarship Now Open!', '\"We are thrilled to announce that applications for the 2024 Academic Excellence Scholarship are now open! This scholarship aims to support outstanding students who demonstrate exceptional academic performance, leadership qualities, and a commitment to com', NULL, '2024-11-26', '22:20:59'),
('f01c86fd-d786-422b-93d9-2c9daf015d97', 'sample no pic', 'sample no pic', NULL, '2024-11-26', '22:18:30'),
('f959cf87-9a34-431b-8f76-0cf52e987803', 'test 1', 'test1', NULL, '2024-11-27', '09:38:00'),
('fb0a9b23-9807-442e-a4ee-e50cbc8f0f89', 'asd', 'asd', NULL, '2024-11-27', '09:35:30');

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
  `file_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `date`, `time`, `file_path`, `file_id`, `user_id`) VALUES
(32, '1733463065738.jpg', '2024-10-06', '10:23:22', '/uploads/1728235909298.pdf', 'aOpwchoT', '0'),
(33, '1728235909302.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909302.pdf', 'aOpwchoT', '0'),
(34, '1728235909304.pdf', '2024-10-06', '10:23:22', '/uploads/1728235909304.pdf', 'aOpwchoT', '0'),
(251, '1734425239864.jpg', '2024-12-17', '16:47:19', '2024-12-17', '08:47:17', 'uploads\\1734425239864.jpg'),
(252, '1734425239844.pdf', '2024-12-17', '16:47:19', '2024-12-17', '08:47:17', 'uploads\\1734425239844.pdf'),
(253, '1734425339660.jpg', '2024-12-17', '16:48:59', 'uploads\\1734425339660.jpg', '70fd9011-dd61-4131-9a4d-e997499945ec', 'f87ce505-ffa9-4e11-bc0b-dc608c03fe45'),
(254, '1734425339639.pdf', '2024-12-17', '16:48:59', 'uploads\\1734425339639.pdf', '35fe116f-bdde-4d7a-aabf-41f03b952c24', 'f87ce505-ffa9-4e11-bc0b-dc608c03fe45'),
(255, '1734425691878.jpg', '2024-12-17', '16:54:51', 'uploads\\1734425691878.jpg', '206d2340-997c-473f-8a6f-61346b4be1cd', '1eedaebe-8364-4830-a62d-72dd3b750a0b'),
(256, '1734425691858.pdf', '2024-12-17', '16:54:51', 'uploads\\1734425691858.pdf', '40872d99-f399-45e8-81cf-58a1d6b27b8b', '1eedaebe-8364-4830-a62d-72dd3b750a0b'),
(257, '1734425958694.jpg', '2024-12-17', '16:59:18', 'uploads\\1734425958694.jpg', 'ba8a6ace-76b7-4a78-aa0e-03da6848fabe', '07f1a73c-62bd-43c5-9d1d-f7add047027f'),
(258, '1734427135513.jpg', '2024-12-17', '17:18:55', 'uploads\\1734427135513.jpg', 'c7c94d7d-1501-4301-9e8d-db99c848619e', 'c79d6e17-e31f-4e29-ba22-94881589d42f'),
(259, '1734427135492.pdf', '2024-12-17', '17:18:55', 'uploads\\1734427135492.pdf', '88c845fd-f265-4460-8c4a-a5c734ab87a5', 'c79d6e17-e31f-4e29-ba22-94881589d42f'),
(260, '1734428915419.jpg', '2024-12-17', '17:48:35', 'uploads\\1734428915419.jpg', '1e523ee4-8e7e-43b9-a855-fc5cab154b45', '37d3b37a-8043-4c83-886f-60a0393d3e74'),
(261, '1734428915388.pdf', '2024-12-17', '17:48:35', 'uploads\\1734428915388.pdf', '34762c48-8f0f-4bbe-8c9f-4e356e9e40a3', '37d3b37a-8043-4c83-886f-60a0393d3e74');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `program_id` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
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
  `status` varchar(20) NOT NULL,
  `archive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `program_id`, `email`, `firstname`, `middlename`, `lastname`, `birthdate`, `gender`, `civil_status`, `current_address`, `permanent_address`, `contact`, `mother_firstname`, `mother_middlename`, `mother_lastname`, `mother_current_address`, `mother_permanent_address`, `mother_contact_number`, `mother_registered_voter`, `mother_voting_years`, `father_firstname`, `father_middlename`, `father_lastname`, `father_current_address`, `father_permanent_address`, `father_contact_number`, `father_registered_voter`, `father_voting_years`, `coe_file`, `brgy_indigency`, `cog_file`, `school_id`, `parent_id`, `profile_picture`, `status`, `archive`) VALUES
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '', 'scholarsoftabukcity@gmail.com', 'dasd', 'asd', 'asd', '2024-12-02', 'male', 'single', 'dasdasd', 'asd', '09760202622', 'dasd', 'asd', 'ads', 'asdasds', 'dasdasd', '0976020255', 0, '22', 'asd', 'asd', 'asd', 'asd', 'asd', '0976222', 1, '12', 'dasd', 'asd', 'asd', 'asd', 'asd', 'default', 'pending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` varchar(255) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `program_desc` varchar(255) NOT NULL,
  `total_applicant` int(100) NOT NULL,
  `limit_slot` int(100) NOT NULL,
  `available_slot` int(100) NOT NULL,
  `program_status` varchar(10) NOT NULL,
  `renewal` tinyint(1) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `program_name`, `program_desc`, `total_applicant`, `limit_slot`, `available_slot`, `program_status`, `renewal`, `date`, `time`) VALUES
('1cb44041-c38a-4744-bea8-cef5e2cf74db', 'sample programs', 'sample programs description', 5, 50, 45, 'renewal', 0, '2024-12-17', '15:35:46'),
('1cb44041-c38a-4744-bea8-cef5e2cf74dx', 'Scholar ng bayan new', 'lroem asdasdasdasd asc ascdasxcas xcas cas dasdasdas as asdasd a asdasdasdasd asdasdas asdasdasdasd', 3, 50, 47, 'renewal', 0, '2024-12-02', '15:20:46'),
('257b3ffb-fade-4fb6-ae85-e6b7e1cd026d', 'rumar scholarship', 'dasdasdasdasdsdasdsadasds', 0, 20, 20, 'active', 0, '1900-01-01', '12:20:46'),
('e273e1f7-421f-46ba-accb-c8b4d1e134ea', 'SAMPLE NEW', 'SAMPLE NEW', 0, 50, 50, 'active', 0, '2024-12-28', '23:02:46');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` varchar(255) NOT NULL,
  `request_type` varchar(20) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `application_id` varchar(255) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `request_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `request_type`, `user_id`, `application_id`, `date`, `time`, `request_status`) VALUES
('78d585f9-51d5-4e7e-8e07-10b48e884037', 'account', '76593bc0-e0a1-4775-ab2d-20dda63b8d22', NULL, '2024-12-17', '17:48:35', 'approved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`anc_id`);

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
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
