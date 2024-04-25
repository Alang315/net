-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2024 a las 18:46:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `greennet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `ID_comment` int(11) NOT NULL,
  `Content` text NOT NULL,
  `Date` datetime NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_publication` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`ID_comment`, `Content`, `Date`, `ID_user`, `ID_publication`) VALUES
(1, 'JCBFHJFBVJBFVFV', '2024-04-17 18:42:41', 9, 15),
(2, 'BGBGBGBGGB', '2024-04-17 18:43:19', 6, 17),
(3, 'GggGGG', '2024-04-17 18:43:51', 9, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publication`
--

CREATE TABLE `publication` (
  `ID_publication` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Content` text NOT NULL,
  `Date` text NOT NULL,
  `Active` int(15) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_topic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publication`
--

INSERT INTO `publication` (`ID_publication`, `Title`, `Content`, `Date`, `Active`, `ID_user`, `ID_topic`) VALUES
(10, 'titulo', 'hola', '0000-00-00', 0, 12, 1),
(11, 'titulo', 'hola', '0000-00-00', 0, 12, 1),
(12, 'dd', 'qqq', '0000-00-00', 0, 9, 1),
(13, 'vvv', 'vvv', '0000-00-00', 0, 9, 1),
(14, 'fff', 'fff', '2024-04-14', 1, 9, 1),
(15, 'fff', 'fff', ' April 14, 2024, 3:04 am', 1, 9, 1),
(16, 'fhbvjf', 'vfvfvf', ' 2024-04-14 03:06:20', 1, 9, 1),
(17, 'ccc', 'ccc', ' 14-04-2024', 1, 9, 1),
(18, 'vv', 'vv', ' 13-04-2024', 1, 9, 1),
(19, 'cc', 'cc', ' 13-04-2024 07:12', 0, 9, 1),
(20, 'vvvv', 'vvv', ' 13-04-2024 07:13 pm', 0, 9, 1),
(21, 'Hola Mundo', 'djdjgjgf', ' 25-04-2024 10:35 am', 0, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reactions_comments`
--

CREATE TABLE `reactions_comments` (
  `ID_reaction` int(11) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_type` int(11) NOT NULL,
  `ID_comment` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reactions_publications`
--

CREATE TABLE `reactions_publications` (
  `ID_reaction` int(11) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_type` int(11) NOT NULL,
  `ID_publication` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reactions_publications`
--

INSERT INTO `reactions_publications` (`ID_reaction`, `ID_user`, `ID_type`, `ID_publication`, `Date`) VALUES
(1, 9, 2, 15, '2024-04-02'),
(2, 9, 5, 15, '2024-04-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reaction_type`
--

CREATE TABLE `reaction_type` (
  `ID_type` int(11) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reaction_type`
--

INSERT INTO `reaction_type` (`ID_type`, `Type`, `Description`) VALUES
(1, 'Like', 'Like que nos brinda informacion sobre a quienes les gusta la publicacion'),
(2, 'Me enoja', 'Reaccion que nos permite saber a quienes les enoja la publicacion o post'),
(3, 'Me entristece', 'Reaccion que nos permite saber a que usuarios les hace sentir tristeza sobre la publicacion'),
(4, 'Me asombra', 'Reaccion que nos brinda informacion sobre a que usuarios les asombra la publicacion'),
(5, 'Me divierte ', 'Reaccion que nos permite saber si a el usuario le divierte la publicacion '),
(6, 'Me encanta', 'Reaccion que nos permite saber si a los usuarios les encanta la publicacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `ID_Role` int(11) NOT NULL,
  `Position` varchar(30) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`ID_Role`, `Position`, `Description`) VALUES
(1, 'Administrador', 'Administrador del foro'),
(2, 'Usuario', 'Usuario normal del foro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `topics`
--

CREATE TABLE `topics` (
  `ID_topic` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` text DEFAULT NULL,
  `ID_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `topics`
--

INSERT INTO `topics` (`ID_topic`, `Name`, `Description`, `ID_user`) VALUES
(1, 'Vida de ecosistemas terrestres', 'El Objetivo 15 de Desarrollo Sostenible (ODS) se centra en la vida de los ecosistemas terrestres. Su objetivo es gestionar sosteniblemente los bosques, luchar contra la desertificación, detener e invertir la degradación de las tierras y detener la pérdida de biodiversidad.', 1),
(2, 'Acción por el clima', 'El Objetivo 13 de Desarrollo Sostenible (ODS) se centra en la acción por el clima. Su objetivo es adoptar medidas urgentes para combatir el cambio climático y sus efectos.', 1),
(3, 'Energía asequible y no contaminante', 'El Objetivo 7 de Desarrollo Sostenible (ODS) se centra en la energía asequible y no contaminante. Su objetivo es garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `ID_user` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Biography` text DEFAULT NULL,
  `ID_Role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`ID_user`, `Username`, `Password`, `Email`, `Biography`, `ID_Role`) VALUES
(1, 'Administrador', '$2y$10$4frjVF590gCcjcf4mcHZyOtSqy4KFIrzm8/HgCqm4V26NSzHbgWFK', 'admin@greennet.com', NULL, 1),
(4, 'Cheto limpiador que emborracha', '$2y$10$zOOGi5SRFMxps815UITfYeh4D.aOgXI/Mi2FFm5S3Q3xQAAv58h2i', '11111@ddd', NULL, 2),
(6, 'Hola mundo', '$2y$10$lWeAGCYjB6tLNnBnOjglcewQles9D3IQu5PPdInRFgfXHbHxlo5YK', 'avargas39@ucol.mx', NULL, 2),
(9, 'prueba', '$2y$10$yWNsobiH1yE2u7faMocLQeLjZiBIMCehb3.kYeUwkv.FaEmnZss2a', 'prueba@u', NULL, 2),
(10, 'Cheto limpiador que emborracha', '$2y$10$UnpmHO7/NZP.d3OtFI/5T.ZbqY46iz3nG8tCuwPnEnBTUWLaVzU.C', 'avargas39@ucol.mx', NULL, 2),
(11, 'ffff', '$2y$10$jybsNc6njMqcLc0Qj2X5De4.C2wkY6SvwFOjW5hp/xEOTQsRJ7GAC', 'ddddd@ddd', NULL, 2),
(12, 'dddddddd', '$2y$10$oWPF8Z9cMOye90CzJknh0.H0qTnPem2OOomjxZEKzsy4KNSrUcbuy', 'jbfhjrhjr@jee', NULL, 2),
(13, 'HDUGJE', '$2y$10$zpuGTX7/yeiAg1c.Q7D1XOY0nSQ2Fk4ckP0EdtKT.Qla/goEd1GHe', 'karla@djnjeed', NULL, 2),
(14, 'XMMgtgtt', '$2y$10$BlGvyXk3s7cQDamucb.EyurLGlCgMnFRBXrej8ZO2fPABcHNf4D3q', 'fverngrn@jifvv', NULL, 2),
(15, 'vfvfbfbg', '$2y$10$wtBZj74ftQ7MRcektZueSeB3M2TDWtsynR41qRim43gR67s9zWKqa', 'frkjvgdkjs@rjnjvrjvrnr', NULL, 2),
(16, 'vfdvf', '$2y$10$8WCuw/fuopXRqofMwqcPL.1lqudpXwcj.Ri4lTfw2/545K9BU6ms6', 'defbe@frkvkrnv', NULL, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID_comment`),
  ADD KEY `comments_ibfk_1` (`ID_publication`),
  ADD KEY `comments_ibfk_2` (`ID_user`);

--
-- Indices de la tabla `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`ID_publication`),
  ADD KEY `publication_ibfk_1` (`ID_user`),
  ADD KEY `publication_ibfk_2` (`ID_topic`);

--
-- Indices de la tabla `reactions_comments`
--
ALTER TABLE `reactions_comments`
  ADD PRIMARY KEY (`ID_reaction`),
  ADD KEY `reactions_comments_ibfk_1` (`ID_user`),
  ADD KEY `reactions_comments_ibfk_2` (`ID_type`),
  ADD KEY `reactions_comments_ibfk_3` (`ID_comment`);

--
-- Indices de la tabla `reactions_publications`
--
ALTER TABLE `reactions_publications`
  ADD PRIMARY KEY (`ID_reaction`),
  ADD KEY `reactions_publications_ibfk_1` (`ID_user`),
  ADD KEY `reactions_publications_ibfk_2` (`ID_type`),
  ADD KEY `reactions_publications_ibfk_3` (`ID_publication`);

--
-- Indices de la tabla `reaction_type`
--
ALTER TABLE `reaction_type`
  ADD PRIMARY KEY (`ID_type`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID_Role`);

--
-- Indices de la tabla `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`ID_topic`),
  ADD KEY `topics_ibfk_1` (`ID_user`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_user`),
  ADD KEY `user_ibfk_1` (`ID_Role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `ID_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `publication`
--
ALTER TABLE `publication`
  MODIFY `ID_publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `reactions_comments`
--
ALTER TABLE `reactions_comments`
  MODIFY `ID_reaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reactions_publications`
--
ALTER TABLE `reactions_publications`
  MODIFY `ID_reaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reaction_type`
--
ALTER TABLE `reaction_type`
  MODIFY `ID_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `ID_Role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `topics`
--
ALTER TABLE `topics`
  MODIFY `ID_topic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ID_publication`) REFERENCES `publication` (`ID_publication`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_ibfk_2` FOREIGN KEY (`ID_topic`) REFERENCES `topics` (`ID_topic`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reactions_comments`
--
ALTER TABLE `reactions_comments`
  ADD CONSTRAINT `reactions_comments_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_comments_ibfk_2` FOREIGN KEY (`ID_type`) REFERENCES `reaction_type` (`ID_type`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_comments_ibfk_3` FOREIGN KEY (`ID_comment`) REFERENCES `comments` (`ID_comment`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reactions_publications`
--
ALTER TABLE `reactions_publications`
  ADD CONSTRAINT `reactions_publications_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_publications_ibfk_2` FOREIGN KEY (`ID_type`) REFERENCES `reaction_type` (`ID_type`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_publications_ibfk_3` FOREIGN KEY (`ID_publication`) REFERENCES `publication` (`ID_publication`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID_user`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ID_Role`) REFERENCES `role` (`ID_Role`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
