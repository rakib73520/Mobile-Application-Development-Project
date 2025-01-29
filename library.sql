-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2025 at 06:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `borrowed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `count`, `borrowed`) VALUES
(6, 'IKIGAI - The Japanese Secret to a Long and Happy Life', 'Hector Garcia', 9, 1),
(7, 'Treasure Island', 'Robert Louis Stevenson', 11, 1),
(8, 'শেষের কবিতা', 'রবীন্দ্রনাথ ঠাকুর', 1, 1),
(9, 'The Rise of the COVFEFE', 'James Feichthaler', 4, 0),
(10, 'Rich Dad Poor Dad', 'Robert Kiyosaki and Sharon Lechter', 6, 1),
(11, 'The Lord of the Rings', 'J.R.R. Tolkien', 14, 1),
(12, 'Little Women', 'Louisa May Alcott', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `bookid` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`id`, `name`, `author`, `date`, `bookid`, `userid`) VALUES
(7, 'Treasure Island', 'Robert Louis Stevenson', '2025-01-27', 7, 2),
(9, 'শেষের কবিতা', 'রবীন্দ্রনাথ ঠাকুর', '2025-01-29', 8, 3),
(10, 'Rich Dad Poor Dad', 'Robert Kiyosaki and Sharon Lechter', '2025-01-29', 10, 3),
(11, 'The Lord of the Rings', 'J.R.R. Tolkien', '2025-01-29', 11, 3),
(12, 'IKIGAI - The Japanese Secret to a Long and Happy Life', 'Hector Garcia', '2025-01-29', 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `username`, `password`) VALUES
(2, 'Sakib Hasan', 'sakib', '1234'),
(3, 'Rakibul Hasan', 'rakib', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
