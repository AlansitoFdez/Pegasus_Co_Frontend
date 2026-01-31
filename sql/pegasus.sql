-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 31, 2026 at 08:07 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pegasus`
--

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

CREATE TABLE `airlines` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `net_worth` decimal(15,2) NOT NULL,
  `closed` tinyint(1) NOT NULL,
  `foundation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `airlines`
--

INSERT INTO `airlines` (`id`, `name`, `country`, `net_worth`, `closed`, `foundation_date`) VALUES
(1, 'Iberia', 'Spain', 250000000.00, 0, '1927-06-28'),
(2, 'Vueling', 'Spain', 120000000.00, 0, '2004-02-10'),
(3, 'Air Europa', 'Spain', 80000000.00, 0, '1986-06-21'),
(4, 'Ryanair', 'Ireland', 300000000.00, 0, '1984-07-08'),
(5, 'Lufthansa', 'Germany', 550000000.00, 0, '1953-01-06'),
(6, 'British Airways', 'United Kingdom', 400000000.00, 0, '1974-03-31'),
(7, 'Alitalia', 'Italy', 10000000.00, 1, '1946-09-16'),
(8, 'Transaero', 'Russia', 5000000.00, 1, '1990-12-28');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int NOT NULL,
  `flight_number` varchar(20) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cancelled` tinyint(1) NOT NULL,
  `departure_date` datetime NOT NULL,
  `airline_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `flight_number`, `origin`, `destination`, `price`, `cancelled`, `departure_date`, `airline_id`) VALUES
(1, 'BRLPAXYZ123', 'Barcelona', 'London', 145.99, 0, '2026-01-21 10:30:00', 1),
(2, 'MADFRAXYZ456', 'Madrid', 'Paris', 189.50, 0, '2026-01-22 08:15:00', 2),
(3, 'SEVLISXYZ789', 'Sevilla', 'Lisbon', 98.75, 1, '2026-01-23 14:45:00', 3),
(4, 'VALROMXYZ012', 'Valencia', 'Rome', 235.99, 0, '2026-01-24 07:20:00', 4),
(5, 'BARBERXYZ345', 'Barcelona', 'Berlin', 172.25, 0, '2026-01-25 11:00:00', 5),
(6, 'MADNYCXYZ678', 'Madrid', 'New York', 650.00, 0, '2026-01-26 09:30:00', 6),
(7, 'MALATHXYZ901', 'Málaga', 'Athens', 210.75, 1, '2026-01-27 16:20:00', 7),
(8, 'BARDUBXYZ234', 'Barcelona', 'Dublin', 132.50, 0, '2026-01-28 06:50:00', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airlines`
--
ALTER TABLE `airlines`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_flights_airline` (`airline_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airlines`
--
ALTER TABLE `airlines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `FK_flights_airline` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
