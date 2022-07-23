import file traditional_game.sql ke phpMyAdmin


ATAU

buat database traditional_game

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


CREATE TABLE `user_id` (
  `id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `token` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_id` (`id`, `user`, `email`, `pass`, `token`, `status`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin', '', 'active'),
(40, 'sakura', 'sakuraH@gmail.com', '12345', 'JkeoJiKoedlzlEmc', 'active'),
(41, 'naruto', 'uzumakinaruto@gmail.com', '12345', 'gtJuWRqTRw7a0ywb', 'active'),
(42, 'sasuke', 'sasukeuchiha@gmail.com', '12345', 'gLR6Gp8myPWZ2t7N', 'active');

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



INSERT INTO `user_profile` (`id`, `user_id`, `first_name`, `last_name`, `phone`, `birth`, `gender`, `address`) VALUES
(18, 40, 'sakura', 'haruno', '081234567890', 947376000000, 'female', '12345678901123456'),
(19, 41, 'Naruto', 'Uzumaki', '081234567890', 949190400000, 'male', 'Konohagakure'),
(20, 42, 'Sasuke', 'Uchiha', '08123456789', 947030400000, 'male', 'Kohohagakure, Uchiha');