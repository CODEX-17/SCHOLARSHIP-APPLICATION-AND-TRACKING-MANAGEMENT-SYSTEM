-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2025 at 01:43 AM
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
('002cf3a9-792f-498f-ba57-40dbf0aab8fd', NULL, 'Juan', 'Dela', 'Cruz', 'n/a', 'n/a', 'admin@gmail.com', 'sha1$79cc32cb$1$8c421ccd655abe3570dbf47cabf1a2986e9e223b', 'admin', NULL, '1734427135513.jpg', NULL, 'approved', '0', '0000-00-00 00:00:00'),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'edmar updated', 'reyes', 'castol', 'tuguegarao', '09760202344', 'scholarsoftabukcity@gmail.com', 'sha1$0f98591f$1$b4dd81740de0b501274733952665357e5c9560ee', 'user', '1733463065738.jpg', 'default', 'free', 'approved', '2a100eb788689863dd0a154b15412a97eb9fe8b4cf9fb20e87f446b1c9af7a4f', '2025-01-15 13:46:44'),
('d99b794c-6691-46b9-a6e8-4c9ed82470b1', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'Rumar', 'asd', 'castol', '#3 CALAMANSI ST. SAN GABRIEL, TUGUEGARAO CITY, CAGAYAN', '09760202622', 'pamparor@gmail.com', 'sha1$0ebc75fc$1$8658d440fde65a23c96d30298920f3f52418322c', 'user', '1737377841871.pdf', '1737377841872.jpg', 'pending', 'approved', NULL, '0000-00-00 00:00:00');

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
(261, '1734428915388.pdf', '2024-12-17', '17:48:35', 'uploads\\1734428915388.pdf', '34762c48-8f0f-4bbe-8c9f-4e356e9e40a3', '37d3b37a-8043-4c83-886f-60a0393d3e74'),
(262, '1736231791670.pdf', '2025-01-07', '14:36:31', '/uploads/1736231791670.pdf', 'eb24f5c5-2fec-4c82-9fdf-1d1080b19390', ''),
(263, '1736238327820.pdf', '2025-01-07', '16:25:28', '/uploads/1736238327820.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(264, '1736238327823.pdf', '2025-01-07', '16:25:28', '/uploads/1736238327823.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(265, '1736238327839.pdf', '2025-01-07', '16:25:28', '/uploads/1736238327839.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(266, '1736238327927.pdf', '2025-01-07', '16:25:28', '/uploads/1736238327927.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(267, '1736238327821.pdf', '2025-01-07', '16:25:28', '/uploads/1736238327821.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(268, '1736238328132.pdf', '2025-01-07', '16:25:28', '/uploads/1736238328132.pdf', 'e991403f-253f-433f-bdd3-3759543e3e86', ''),
(269, '1736239007321.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007321.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(270, '1736239007327.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007327.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(271, '1736239007335.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007335.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(272, '1736239007341.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007341.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(273, '1736239007339.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007339.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(274, '1736239007343.pdf', '2025-01-07', '16:36:47', '/uploads/1736239007343.pdf', '8e1994ea-b127-41bd-871e-ea6adfea282e', ''),
(275, '1736241206800.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206800.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(276, '1736241206781.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206781.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(277, '1736241206891.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206891.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(278, '1736241206965.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206965.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(279, '1736241206950.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206950.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(280, '1736241206994.pdf', '2025-01-07', '17:13:27', '/uploads/1736241206994.pdf', 'c48e280f-11db-4796-97b4-b6f4131a13a2', ''),
(281, '1736241498222.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498222.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(282, '1736241498268.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498268.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(283, '1736241498272.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498272.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(284, '1736241498278.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498278.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(285, '1736241498275.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498275.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(286, '1736241498287.pdf', '2025-01-07', '17:18:18', '/uploads/1736241498287.pdf', '74f41d5d-1c04-488b-a328-c35ea423af8d', ''),
(287, '1737376724710.jpg', '2025-01-20', '20:38:44', 'uploads\\1737376724710.jpg', 'e3d33489-4755-4b15-b350-9c6e7df2eada', 'bc015654-1f48-4956-aa5f-4108256aa29a'),
(288, '1737376724708.pdf', '2025-01-20', '20:38:44', 'uploads\\1737376724708.pdf', '796e670f-571d-4389-a33e-854a6d043b03', 'bc015654-1f48-4956-aa5f-4108256aa29a'),
(289, '1737377841872.jpg', '2025-01-20', '20:57:21', 'uploads\\1737377841872.jpg', 'b043cd35-a2a2-4b99-a7d3-ed27fde957ff', 'd99b794c-6691-46b9-a6e8-4c9ed82470b1'),
(290, '1737377841871.pdf', '2025-01-20', '20:57:21', 'uploads\\1737377841871.pdf', '0a7a0643-beed-4e39-bc07-7838f6fa9f43', 'd99b794c-6691-46b9-a6e8-4c9ed82470b1'),
(291, '1737378192689.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192689.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', ''),
(292, '1737378192690.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192690.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', ''),
(293, '1737378192693.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192693.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', ''),
(294, '1737378192720.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192720.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', ''),
(295, '1737378192694.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192694.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', ''),
(296, '1737378192694.pdf', '2025-01-20', '21:03:12', '/uploads/1737378192694.pdf', 'bba37bf8-7958-46ac-874b-02ae3e7b80d8', '');

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
  `age` int(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `contact` varchar(20) NOT NULL,
  `primary_school_name` varchar(100) NOT NULL,
  `primary_school_address` varchar(100) NOT NULL,
  `primary_school_year_attended` varchar(100) NOT NULL,
  `secondary_school_name` varchar(100) NOT NULL,
  `secondary_school_address` varchar(100) NOT NULL,
  `secondary_school_year_attended` varchar(100) NOT NULL,
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
  `certificate_of_registration_comelec` varchar(255) NOT NULL,
  `profile_picture` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `program_id`, `email`, `firstname`, `middlename`, `lastname`, `birthdate`, `age`, `gender`, `civil_status`, `current_address`, `permanent_address`, `contact`, `primary_school_name`, `primary_school_address`, `primary_school_year_attended`, `secondary_school_name`, `secondary_school_address`, `secondary_school_year_attended`, `mother_firstname`, `mother_middlename`, `mother_lastname`, `mother_current_address`, `mother_permanent_address`, `mother_contact_number`, `mother_registered_voter`, `mother_voting_years`, `father_firstname`, `father_middlename`, `father_lastname`, `father_current_address`, `father_permanent_address`, `father_contact_number`, `father_registered_voter`, `father_voting_years`, `coe_file`, `brgy_indigency`, `cog_file`, `school_id`, `parent_id`, `certificate_of_registration_comelec`, `profile_picture`, `status`) VALUES
('', 'd99b794c-6691-46b9-a6e8-4c9ed82470b1', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'pamparor@gmail.com', 'Rumar', 'asd', 'castol', '2025-01-16', 0, 'Male', 'Single', 'sample current', 'sample permanent', '09760202622', 'asdas', '123 Primary School St, Sample City', '2005-2010', 'Sample Elementary School', '123 Primary School St, Sample City', '2005-2010', 'dsadas', 'dasd', 'dasd', 'asdas', 'dasdasdasda', '09769393933', 0, '1', 'dasd', 'asdas', 'dasdsa', 'dasdas', 'dasdas', '09769393933', 0, '3', '1737378192689.pdf', '1737378192690.pdf', '1737378192693.pdf', '1737378192694.pdf', '1737378192694.pdf', '1737378192720.pdf', '', ''),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb520', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb5288', '', 'ash.ampart17@gmail.com', 'dasd', 'asd', 'asd', '2024-11-29', 0, 'Male', 'Single', 'sample current', 'sample permanent', '09760202622', 'Sample Elementary School', '123 Primary School St, Sample City', '2005-2010', 'Sample Elementary School', '123 Primary School St, Sample City', '2005-2010', 'dasd', 'asd', 'ads', 'asdasds', 'dasdasd', '0976020255', 0, '22', 'asd', 'asd', 'asd', 'asd', 'asd', '0976222', 0, '12', '1736231791670.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', '1734427135513.jpg', 'pending'),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'scholarsoftabukcity@gmail.com', 'dasd', 'asd', 'asd', '2024-11-29', 0, 'Male', 'Single', 'sample current', 'sample permanent', '09760202622', 'Sample Elementary School', '123 Primary School St, Sample City', '2005-2010', 'Sample Elementary School', '123 Primary School St, Sample City', '2005-2010', 'dasd', 'asd', 'ads', 'asdasds', 'dasdasd', '0976020255', 0, '22', 'asd', 'asd', 'asd', 'asd', 'asd', '0976222', 0, '12', '1736231791670.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', 'sample.pdf', '1734427135513.jpg', 'pending');

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
('1cb44041-c38a-4744-bea8-cef5e2cf74db', 'sample programs new', 'sample programs description', 5, 50, 45, '', 0, '2024-12-17', '15:35:46'),
('1cb44041-c38a-4744-bea8-cef5e2cf74dx', 'Scholar ng bayan new', 'lroem asdasdasdasd asc ascdasxcas xcas cas dasdasdas as asdasd a asdasdasdasd asdasdas asdasdasdasd', 3, 50, 47, 'renewal', 0, '2024-12-02', '15:20:46'),
('257b3ffb-fade-4fb6-ae85-e6b7e1cd026d', 'rumar scholarship', 'dasdasdasdasdsdasdsadasds', 0, 20, 20, 'active', 0, '1900-01-01', '12:20:46'),
('291f5e47-c7f6-4f06-ab5c-f32119561a9c', 'new', 'aasdasds', 0, 50, 50, '', 1, '2025-01-02', '17:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` varchar(255) NOT NULL,
  `request_type` varchar(20) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `program_id` varchar(255) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `request_status` varchar(20) NOT NULL,
  `archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `request_type`, `user_id`, `program_id`, `date`, `time`, `request_status`, `archived`) VALUES
('d6deaae9-cd4c-4653-ad95-29167467f0e9', 'program', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', '2025-01-09', '20:53:46', 'approved', 1),
('e25826b6-f5a5-4cef-8587-99fb4edbe2a6', 'program', 'd99b794c-6691-46b9-a6e8-4c9ed82470b1', '1cb44041-c38a-4744-bea8-cef5e2cf74db', '2025-01-20', '21:03:30', 'pending', 0),
('f0cb5448-582a-4177-a906-b1f4de418838', 'account', 'd99b794c-6691-46b9-a6e8-4c9ed82470b1', NULL, '2025-01-20', '20:57:21', 'approved', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
