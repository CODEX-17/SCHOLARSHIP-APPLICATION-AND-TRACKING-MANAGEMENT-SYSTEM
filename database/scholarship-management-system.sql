-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 02:05 PM
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
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `apply_status` varchar(10) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`user_id`, `program_id`, `username`, `email`, `password`, `type`, `filename`, `apply_status`, `reset_token`, `reset_token_expires`) VALUES
('002cf3a9-792f-498f-ba57-40dbf0aab8fd', '03450c73-aada-4b90-82f5-92fc22cd6206', 'admin17', 'admin@gmail.com', 'sha1$79cc32cb$1$8c421ccd655abe3570dbf47cabf1a2986e9e223b', 'admin', '1728202089909.png', 'applied', '0', '0000-00-00 00:00:00'),
('0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'edmar104', 'scholarsoftabukcity@gmail.com', 'sha1$0f98591f$1$b4dd81740de0b501274733952665357e5c9560ee', 'user', '1733463065738.jpg', 'applied', NULL, '0000-00-00 00:00:00');

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
(175, '1729127879258.pdf', '2024-10-17', '09:17:59', '/uploads/1729127879258.pdf', 'e9af464a-d9db-4027-a405-882dcbe306cb'),
(176, '1730037777807.pdf', '2024-10-27', '22:02:57', '/uploads/1730037777807.pdf', '3c5c5c78-941b-48c6-b4a5-7062310ebc76'),
(177, '1730037777823.pdf', '2024-10-27', '22:02:57', '/uploads/1730037777823.pdf', '3c5c5c78-941b-48c6-b4a5-7062310ebc76'),
(178, '1730037777824.pdf', '2024-10-27', '22:02:57', '/uploads/1730037777824.pdf', '3c5c5c78-941b-48c6-b4a5-7062310ebc76'),
(179, '1730037777824.pdf', '2024-10-27', '22:02:57', '/uploads/1730037777824.pdf', '3c5c5c78-941b-48c6-b4a5-7062310ebc76'),
(180, '1730037777825.pdf', '2024-10-27', '22:02:57', '/uploads/1730037777825.pdf', '3c5c5c78-941b-48c6-b4a5-7062310ebc76'),
(181, '1731401385245.pdf', '2024-11-12', '16:49:45', '/uploads/1731401385245.pdf', '9bc1dadf-4d57-4e5a-8cff-a181659ad0b1'),
(182, '1731401385249.pdf', '2024-11-12', '16:49:45', '/uploads/1731401385249.pdf', '9bc1dadf-4d57-4e5a-8cff-a181659ad0b1'),
(183, '1731401385263.pdf', '2024-11-12', '16:49:45', '/uploads/1731401385263.pdf', '9bc1dadf-4d57-4e5a-8cff-a181659ad0b1'),
(184, '1731401385273.pdf', '2024-11-12', '16:49:45', '/uploads/1731401385273.pdf', '9bc1dadf-4d57-4e5a-8cff-a181659ad0b1'),
(185, '1731401385282.pdf', '2024-11-12', '16:49:45', '/uploads/1731401385282.pdf', '9bc1dadf-4d57-4e5a-8cff-a181659ad0b1'),
(226, '1731402471857.pdf', '2024-11-12', '17:07:51', '/uploads/1731402471857.pdf', '39a7cbcb-822e-4f5c-9637-d970ec10fcee'),
(227, '1731402471868.pdf', '2024-11-12', '17:07:51', '/uploads/1731402471868.pdf', '39a7cbcb-822e-4f5c-9637-d970ec10fcee'),
(228, '1731402471869.pdf', '2024-11-12', '17:07:51', '/uploads/1731402471869.pdf', '39a7cbcb-822e-4f5c-9637-d970ec10fcee'),
(229, '1731402471869.pdf', '2024-11-12', '17:07:51', '/uploads/1731402471869.pdf', '39a7cbcb-822e-4f5c-9637-d970ec10fcee'),
(230, '1731402471870.pdf', '2024-11-12', '17:07:51', '/uploads/1731402471870.pdf', '39a7cbcb-822e-4f5c-9637-d970ec10fcee'),
(231, '1732015270216.pdf', '2024-11-19', '19:21:10', '/uploads/1732015270216.pdf', 'a527c136-7ec4-4694-8db0-521e08edeaad'),
(232, '1732015270216.pdf', '2024-11-19', '19:21:10', '/uploads/1732015270216.pdf', 'a527c136-7ec4-4694-8db0-521e08edeaad'),
(233, '1732015270217.pdf', '2024-11-19', '19:21:10', '/uploads/1732015270217.pdf', 'a527c136-7ec4-4694-8db0-521e08edeaad'),
(234, '1732015270275.pdf', '2024-11-19', '19:21:10', '/uploads/1732015270275.pdf', 'a527c136-7ec4-4694-8db0-521e08edeaad'),
(235, '1732015270369.pdf', '2024-11-19', '19:21:10', '/uploads/1732015270369.pdf', 'a527c136-7ec4-4694-8db0-521e08edeaad'),
(236, '1733486281338.pdf', '2024-12-06', '19:58:01', '/uploads/1733486281338.pdf', 'fc4381af-7bec-4d73-9783-cd52af7baea2'),
(237, '1733486281351.pdf', '2024-12-06', '19:58:01', '/uploads/1733486281351.pdf', 'fc4381af-7bec-4d73-9783-cd52af7baea2'),
(238, '1733486281356.pdf', '2024-12-06', '19:58:01', '/uploads/1733486281356.pdf', 'fc4381af-7bec-4d73-9783-cd52af7baea2'),
(239, '1733486281361.pdf', '2024-12-06', '19:58:01', '/uploads/1733486281361.pdf', 'fc4381af-7bec-4d73-9783-cd52af7baea2'),
(240, '1733486281366.pdf', '2024-12-06', '19:58:01', '/uploads/1733486281366.pdf', 'fc4381af-7bec-4d73-9783-cd52af7baea2'),
(241, '1733486292951.pdf', '2024-12-06', '19:58:13', '/uploads/1733486292951.pdf', '846c31ab-664a-43bd-a29a-bd03a7d43a6d'),
(242, '1733486292969.pdf', '2024-12-06', '19:58:13', '/uploads/1733486292969.pdf', '846c31ab-664a-43bd-a29a-bd03a7d43a6d'),
(243, '1733486292975.pdf', '2024-12-06', '19:58:13', '/uploads/1733486292975.pdf', '846c31ab-664a-43bd-a29a-bd03a7d43a6d'),
(244, '1733486292981.pdf', '2024-12-06', '19:58:13', '/uploads/1733486292981.pdf', '846c31ab-664a-43bd-a29a-bd03a7d43a6d'),
(245, '1733486292986.pdf', '2024-12-06', '19:58:13', '/uploads/1733486292986.pdf', '846c31ab-664a-43bd-a29a-bd03a7d43a6d'),
(246, '1733488532305.pdf', '2024-12-06', '20:35:32', '/uploads/1733488532305.pdf', '4fcfd9af-7691-4945-a3cd-86d3324b6703'),
(247, '1733488532310.pdf', '2024-12-06', '20:35:32', '/uploads/1733488532310.pdf', '4fcfd9af-7691-4945-a3cd-86d3324b6703'),
(248, '1733488532314.pdf', '2024-12-06', '20:35:32', '/uploads/1733488532314.pdf', '4fcfd9af-7691-4945-a3cd-86d3324b6703'),
(249, '1733488532315.pdf', '2024-12-06', '20:35:32', '/uploads/1733488532315.pdf', '4fcfd9af-7691-4945-a3cd-86d3324b6703'),
(250, '1733488532321.pdf', '2024-12-06', '20:35:32', '/uploads/1733488532321.pdf', '4fcfd9af-7691-4945-a3cd-86d3324b6703');

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
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `program_id`, `email`, `firstname`, `middlename`, `lastname`, `birthdate`, `gender`, `civil_status`, `current_address`, `permanent_address`, `contact`, `mother_firstname`, `mother_middlename`, `mother_lastname`, `mother_current_address`, `mother_permanent_address`, `mother_contact_number`, `mother_registered_voter`, `mother_voting_years`, `father_firstname`, `father_middlename`, `father_lastname`, `father_current_address`, `father_permanent_address`, `father_contact_number`, `father_registered_voter`, `father_voting_years`, `coe_file`, `brgy_indigency`, `cog_file`, `school_id`, `parent_id`, `profile_picture`, `status`) VALUES
('03450c73-aada-4b90-82f5-92fc22cd6206', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74dx', 'scholarsoftabukcity@gmail.com', 'john', 'cruz', 'dela', '2024-11-06', 'male', 'single', 'cagayan', 'cagayan', '09760202655', 'jane', 'dela', 'cruz', 'cagayan', 'cagayan', '09760252533', 0, '0', 'rubeb', 'dasd', 'dass', 'cagayan', 'cagayan', '09865478599', 0, '0', '1732015270216.pdf', '1732015270216.pdf', '1732015270217.pdf', '1732015270369.pdf', '1732015270275.pdf', '1728235909292.png', 'pending'),
('2804ea06-54ca-47d5-81a5-1361e3b42729', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'scholarsoftabukcity@gmail.com', 'dasd', 'asdasdas', 'asdas', '2024-12-07', 'male', 'single', 'dasdas', 'asdasdsa', '09876543244', 'dasda', 'dasdas', 'dasda', 'dasdasd', 'asdasdas', '09876543244', 0, '0', 'dasdsa', 'asdas', 'dasdsa', 'dasd', 'asdasdsa', '09876543244', 0, '0', '1733488532305.pdf', '1733488532310.pdf', '1733488532314.pdf', '1733488532321.pdf', '1733488532315.pdf', '1733463065738.jpg', 'approved'),
('abfcccea-9765-4e50-a58e-0851527afecc', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'scholarsoftabukcity@gmail.com', 'asdasd', 'asdasd', 'asdasd', '2024-12-07', 'male', 'single', '4A San Louis  Baguio city', 'sadasdsa', '09842657913', 'dasdasd', 'asdasd', 'asdasda', 'sdasdas', 'rfdfdsfds', '09676020622', 0, '1', 'dasd', 'asdasdas', 'dasda', 'sdasda', 'dasdasdsa', '09676020622', 0, '1', '1733486281338.pdf', '1733486281351.pdf', '1733486281356.pdf', '1733486281366.pdf', '1733486281361.pdf', '1733463065738.jpg', 'pending'),
('b2f306d1-f49c-4303-832a-158f712d0d02', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74db', 'scholarsoftabukcity@gmail.com', 'asdasd', 'asdasd', 'asdasd', '2024-12-07', 'male', 'single', '4A San Louis  Baguio city', 'sadasdsa', '09842657913', 'dasdasd', 'asdasd', 'asdasda', 'sdasdas', 'rfdfdsfds', '09676020622', 0, '1', 'dasd', 'asdasdas', 'dasda', 'sdasda', 'dasdasdsa', '09676020622', 0, '1', '1733486292951.pdf', '1733486292969.pdf', '1733486292975.pdf', '1733486292986.pdf', '1733486292981.pdf', '1733463065738.jpg', 'pending'),
('fe0ebeae-85fe-441a-a646-efe88cdcfce1', '0a8b18ed-7735-46e1-a6b4-0eb6af8eb528', '1cb44041-c38a-4744-bea8-cef5e2cf74dx', 'scholarsoftabukcity@gmail.com', 'mark', 'hilario', 'reyes', '2024-10-04', 'male', 'single', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 'rome', 'jiohn', 'reyes', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 1, '6', 'shine', 'marie', 'reyes', 'zone 1 penablanca, cagayan', 'zone 1 penablanca, cagayan', '09760202322', 1, '3', '1729127389452.pdf', '1729127389482.pdf', '1729127389499.pdf', '1729127389525.pdf', '1729127389506.pdf', '1728202089909.png', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` varchar(255) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `program_desc` varchar(255) NOT NULL,
  `total_applicant` int(100) NOT NULL,
  `program_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `program_name`, `program_desc`, `total_applicant`, `program_status`) VALUES
('1cb44041-c38a-4744-bea8-cef5e2cf74db', 'sample programs', 'sample programs description', 5, 'renewal'),
('1cb44041-c38a-4744-bea8-cef5e2cf74dx', 'Scholar ng bayan new', 'lroem asdasdasdasd asc ascdasxcas xcas cas dasdasdas as asdasd a asdasdasdasd asdasdas asdasdasdasd', 3, 'renewal'),
('5534ae1a-37e1-4c43-8652-3720801cfaef', 'sample programs', 'sample programs description', 1, 'active'),
('5d6bb4c1-f47b-4748-93bc-0150b407aa5c', 'sample programs', 'sample programs description', 1, 'active'),
('b69e6e47-d179-4e99-8497-0e3ed9a944e3', 'sample pls', 'sample pls', 0, 'renewal');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
