-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jul 2022 pada 13.35
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `traditional_game`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_history`
--

CREATE TABLE `user_history` (
  `id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `win` int(11) NOT NULL,
  `draw` int(11) NOT NULL,
  `lose` int(11) NOT NULL,
  `scheme` varchar(45) NOT NULL,
  `oponent` varchar(45) NOT NULL,
  `timestamp` bigint(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_history`
--

INSERT INTO `user_history` (`id`, `user_id`, `user`, `win`, `draw`, `lose`, `scheme`, `oponent`, `timestamp`) VALUES
(11, 40, 'sakuraharuno', 1, 0, 0, 'P1 ✊???? vs BOT ✌???? (P1 WIN)', 'BOT', 1658487287325),
(12, 40, 'sakuraharuno', 0, 0, 1, 'P1 ✊???? vs BOT ✋???? (BOT WIN)', 'BOT', 1658487288641),
(13, 40, 'sakuraharuno', 1, 0, 0, 'P1 ✊???? vs BOT ✌???? (P1 WIN)', 'BOT', 1658487397522),
(14, 40, 'sakuraharuno', 1, 0, 0, 'P1 ✋???? vs BOT ✊???? (P1 WIN)', 'BOT', 1658487398349),
(15, 40, 'sakuraharuno', 0, 1, 0, 'P1 ✋???? vs BOT ✋???? (DRAW)', 'BOT', 1658488169016),
(16, 40, 'sakuraharuno', 0, 0, 1, 'P1 ✊???? vs BOT ✋???? (BOT WIN)', 'BOT', 1658488932987),
(17, 40, 'sakuraharuno', 0, 1, 0, 'P1 ✋???? vs BOT ✋???? (DRAW)', 'BOT', 1658488933803),
(18, 40, 'sakuraharuno', 1, 0, 0, 'P1 ✌???? vs BOT ✋???? (P1 WIN)', 'BOT', 1658488934183),
(20, 40, 'sakuraharuno', 0, 1, 0, 'P1 ✋???? vs BOT ✋???? (DRAW)', 'BOT', 1658489265647);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_id`
--

CREATE TABLE `user_id` (
  `id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `token` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_id`
--

INSERT INTO `user_id` (`id`, `user`, `email`, `pass`, `token`, `status`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin', '', 'active'),
(40, 'Sakura', 'sakuraH@gmail.com', '12345', 'JkeoJiKoedlzlEmc', 'active'),
(41, 'Naruto', 'uzumakinaruto@gmail.com', '12345', 'gtJuWRqTRw7a0ywb', 'active'),
(42, 'Sasuke', 'sasukeuchiha@gmail.com', '12345', 'gLR6Gp8myPWZ2t7N', 'active');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `birth` bigint(45) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `first_name`, `last_name`, `phone`, `birth`, `gender`, `address`) VALUES
(18, 40, 'sakura', 'haruno', '081234567890', 947376000000, 'female', '12345678901123456'),
(19, 41, 'Naruto', 'Uzumaki', '081234567890', 949190400000, 'male', 'Konohagakure'),
(20, 42, 'Sasuke', 'Uchiha', '08123456789', 947030400000, 'male', 'Kohohagakure, Uchiha');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `user_history`
--
ALTER TABLE `user_history`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_id`
--
ALTER TABLE `user_id`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `user_history`
--
ALTER TABLE `user_history`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `user_id`
--
ALTER TABLE `user_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
