-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2024 a las 11:36:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
-- Estructura de tabla para la tabla `codes`
--

CREATE TABLE `codes` (
  `ID_code` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `code` varchar(5) NOT NULL,
  `expire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `codes`
--

INSERT INTO `codes` (`ID_code`, `email`, `code`, `expire`) VALUES
(1, 'vilchiskamila@gmail.com', '26921', 1715630153),
(2, 'vilchiskamila@gmail.com', '44666', 1715630231),
(3, 'kramirez32@ucol.mx', '83164', 1716282203),
(4, 'kramirez32@ucol.mx', '22473', 1716282213),
(5, 'kramirez32@ucol.mx', '99618', 1716310227),
(6, 'kramirez32@ucol.mx', '27062', 1716310714),
(7, 'kramirez32@ucol.mx', '34246', 1716310759);

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
(5, '¡Amando siempre en todas las estaciones! ❤️', '2024-05-27 11:58:10', 3, 8),
(6, 'Demasiado calor ', '2024-05-28 08:31:41', 3, 5),
(7, 'Odio el calor', '2024-05-28 12:34:59', 1, 5),
(8, 'A mí me da miedo que las empresas sigan gastando litros y litros de agua y que el gobierno intenta que nosotros seamos los que ahorremos', '2024-05-28 12:56:04', 2, 13),
(9, 'Ríos y lagunas secas, donde antes paseaban en lancha, ahora pasan caminando 😢', '2024-05-28 12:56:52', 4, 13),
(10, 'Comparto ese encanto por la naturaleza, es tan hermosa ❤️🍃', '2024-05-28 01:08:42', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publication`
--

CREATE TABLE `publication` (
  `ID_publication` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Content` text NOT NULL,
  `Date` text NOT NULL,
  `Active` int(15) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_topic` int(11) NOT NULL,
  `Image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publication`
--

INSERT INTO `publication` (`ID_publication`, `Title`, `Content`, `Date`, `Active`, `ID_user`, `ID_topic`, `Image`) VALUES
(1, 'HOLA MUNDO', 'Este es mi primer post, me alegra estar aqui', '10-04-2024 10:20 a.m.', 1, 2, 17, NULL),
(2, 'NATURALEZA PRECIOSA', 'El rescostarse debajo de un árbol y disfrutar de la sombra y el viento, es algo tan simple pero tan genial. ¿Porqué no proteger esto tan grandioso?', '12-04-2024 11:30 p.m.', 1, 3, 15, NULL),
(3, '¿EDUCACIÓN O ADOCTRINAMIENTO?', '¿El sistema educativo actual es de calidad o en realidad dirige a un adoctrinamiento para ser un empleado más?, Algo cuestionable desde hace tiempo es el hecho de que en la educación no hay materias tales como la Educación Financiera', '16-04-2024 07:30 p.m.', 1, 2, 4, NULL),
(4, 'SIMPLEMENTE HERMOSO', 'Amo correr en un campo abierto, sentirme libre y sin preocupaciones, simplemente es algo que causa un sentimiento satisfactorio', ' 25-04-2024 10:35 am', 1, 3, 15, NULL),
(5, 'CALOR 🥵', 'Cada año hace más calor', ' 02-05-2024 06:35 pm', 1, 4, 13, NULL),
(7, 'De Basura a Energía', 'Con los residuos sólidos urbanos se puede generar energía térmica (agua o aire caliente y vapor), energía eléctrica e incluso mecánica mediante el uso de biocarburantes en motores de combustión interna mediante el procedimiento apropiado de transformación.', ' 05-05-2024 07:58 pm', 1, 2, 7, 'basura_a_energia.jpg'),
(8, 'El amor no es de a ratos', 'El amor debe de ser y estar durante todas las estaciones, no solo en primavera cuando más florece, si no también en verano, cuando más cansancio se siente por el calor, también en otoño, cuando todas esas hojas y flores hermosas se han ido, y en invierno, cuando más calor se necesita', ' 07-05-2024 09:58 am', 1, 2, 15, 'estaciones.gif'),
(9, '¡JUSTICIA!', '¡Justicia para todas aquellas personas que no inician una guerra pero son quienes pagan las consecuencias!, A todas esas personas que no pueden si quiera vivir tranquilas sabiendo que en cualquier momento sus gobernantes iniciarán batallas y ellos se irán a esconder porque son unos cobardes, unos cobardes que no se entregan, unos cobardes que avientan la piedra y esconden la mano.', ' 10-05-2024 12:18 am', 1, 2, 16, NULL),
(11, 'Siempre recordemos a quienes nos ayudaron', 'Aún recuerdo que cuando era niño hubo una vez que estaba teniendo un mal día, en la casa mi familia estaba peleada, yo ni desayuné y en la escuela tenía mucha hambre, no me dieron para gastar ni llevé comida, pero ahí estuvo Kito, me compartió comida y me invitó a su casa luego de clases, sus padres eran amigos de los míos, sabían lo que pasaba en casa y me llevaron a su casa para no tener que lidiar con problemas de adultos, estuve todo ese día jugando con Kito, un gran amigo de siempre. Muchas gracias Kito, te quiero mucho  ❤️', ' 10-05-2024 08:03 pm', 1, 4, 3, NULL),
(12, 'Kito, mi hermano', 'En serio no sé cómo agradecerte por todo lo que has hecho por mí 😢❤️‍🩹 sólo sé que ahora que necesitas de mi apoyo, aquí estoy y no sabes la impotencia que me da no poder hacer más por ti, pero en serio, cualquier apoyo económico o moral que ocupes, aquí estoy.', ' 10-05-2024 08:03 pm', 1, 4, 3, NULL),
(13, 'EN SERIO, HACE CALOR', 'Gente, ¿de verdad no les asusta el hecho de que hace cada vez más calor y que lo repelemos con electricidad y que la electricidad comienza a fallar y en es probable que en algún punto no tengamos nada para lidiar con el calor? y ni hablar del agua que está escaseando, en serio, hay un problema.', ' 10-05-2024 08:13 pm', 1, 3, 13, NULL),
(14, 'No puedo cambiar todo el mundo, pero puedo cambiar el pedazito que me toca ', '🌱❤️‍🩹', ' 28-05-2024 03:30 am', 0, 2, 15, 'plantando_arbolito.jpeg');

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
(37, 4, 6, 2, '0000-00-00'),
(38, 4, 4, 3, '0000-00-00'),
(39, 4, 6, 4, '0000-00-00'),
(40, 4, 6, 7, '0000-00-00'),
(41, 4, 6, 8, '0000-00-00'),
(42, 4, 3, 9, '0000-00-00'),
(44, 3, 4, 3, '0000-00-00'),
(45, 3, 3, 5, '0000-00-00'),
(46, 3, 6, 7, '0000-00-00'),
(47, 3, 6, 8, '0000-00-00'),
(48, 3, 4, 9, '0000-00-00'),
(49, 3, 6, 11, '0000-00-00'),
(50, 3, 6, 12, '0000-00-00'),
(52, 2, 6, 4, '0000-00-00'),
(53, 2, 6, 8, '0000-00-00'),
(54, 2, 6, 11, '0000-00-00'),
(55, 2, 6, 12, '0000-00-00'),
(56, 2, 3, 13, '0000-00-00'),
(57, 2, 6, 2, '0000-00-00');

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
(1, '1.Fin de la pobreza', 'El Objetivo 1 de Desarrollo Sostenible (ODS) se centra en erradicar la pobreza, busca poner fin a la pobreza en todas sus formas en todo el mundo.', 1),
(2, '2.Hambre cero', 'El Objetivo 2 de Desarrollo Sostenible (ODS) tiene de meta poner fin al hambre.', 1),
(3, '3.Salud y bienestar', 'El Objetivo 3 de Desarrollo Sostenible (ODS) se centra en garantizar una vida sana y promover el bienestar para todos en todas las edades.', 1),
(4, '4.Educación de calidad', 'El Objetivo 4 de Desarrollo Sostenible (ODS) se trata sobre garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.', 1),
(5, '5.Igualdad de género', 'El Objetivo 5 de Desarrollo Sostenible (ODS) habla sobre lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas, siendo que son las más afectadas por la desigualdad, de igual manera erradicar la desigualdad que afecta a hombres y niños.', 1),
(6, '6.Agua limpia y saneamiento', 'El Objetivo 6 de Desarrollo Sostenible (ODS) se centra en garantizar la disponibilidad de agua y su gestión sostenible y el saneamiento para todos.', 1),
(7, '7.Energía asequible y no contaminante', 'El Objetivo 7 de Desarrollo Sostenible (ODS) se centra en la energía asequible y no contaminante. Su objetivo es garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos.', 1),
(8, '8.Trabajo decente y crecimiento económico', 'El Objetivo 8 de Desarrollo Sostenible (ODS) intenta promover el crecimiento económico inclusivo y sostenible, el empleo y el trabajo decente para todos.', 1),
(9, '9.Industria, innovación e infraestructuras ', 'El Objetivo 9 de Desarrollo Sostenible (ODS) busca construir infraestructuras resilientes, promover la industrialización sostenible y fomentar la innovación.', 1),
(10, '10.Reducción de las desigualdades', 'El Objetivo 10 de Desarrollo Sostenible (ODS) recae en reducir la desigualdad en y entre los países.', 1),
(11, '11.Ciudades y comunidades sostenibles', 'El Objetivo 11 de Desarrollo Sostenible (ODS) se basa en lograr que las ciudades sean más inclusivas, seguras, resilientes y sostenibles.', 1),
(12, '12.Producción y consumo responsables', 'El Objetivo 12 de Desarrollo Sostenible (ODS) se centra en garantizar modalidades de consumo y producción sostenibles.', 1),
(13, '13.Acción por el clima', 'El Objetivo 13 de Desarrollo Sostenible (ODS) se centra en la acción por el clima. Su objetivo es adoptar medidas urgentes para combatir el cambio climático y sus efectos.', 1),
(14, '14.Vida submarina', 'El Objetivo 14 de Desarrollo Sostenible (ODS) se centra en conservar y utilizar sosteniblemente los océanos, los mares y los recursos marinos.', 1),
(15, '15.Vida de ecosistemas terrestres', 'El Objetivo 15 de Desarrollo Sostenible (ODS) se centra en la vida de los ecosistemas terrestres. Su objetivo es gestionar sosteniblemente los bosques, luchar contra la desertificación, detener e invertir la degradación de las tierras y detener la pérdida de biodiversidad.', 1),
(16, '16.Paz, justicia e instituciones sólidas', 'El Objetivo 16 de Desarrollo Sostenible (ODS) busca promover sociedades justas, pacíficas e inclusivas.', 1),
(17, '17.Alianzas para lograr los objetivos', 'El Objetivo 16 de Desarrollo Sostenible (ODS) consiste en revitalizar la Alianza Mundial para el Desarrollo Sostenible.', 1);

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
(1, 'Administrador', '$2y$10$okb1t2xizW4JicC1JOTm/.UUYrriyZZXTLQbzlCegm0cph/IXUM2m', 'admin@greennet.com', NULL, 1),
(2, 'Wolfkarl', '$2y$10$okb1t2xizW4JicC1JOTm/.UUYrriyZZXTLQbzlCegm0cph/IXUM2m', 'karlarmlp@gmail.com', NULL, 2),
(3, 'Alan VP', '$2y$10$okb1t2xizW4JicC1JOTm/.UUYrriyZZXTLQbzlCegm0cph/IXUM2m', 'avargas39@ucol.mx', NULL, 2),
(4, 'Gabito', '$2y$10$okb1t2xizW4JicC1JOTm/.UUYrriyZZXTLQbzlCegm0cph/IXUM2m', 'lramirez68@ucol.mx', NULL, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`ID_code`),
  ADD KEY `code` (`code`),
  ADD KEY `email` (`email`),
  ADD KEY `expire` (`expire`);

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
-- AUTO_INCREMENT de la tabla `codes`
--
ALTER TABLE `codes`
  MODIFY `ID_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `ID_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `publication`
--
ALTER TABLE `publication`
  MODIFY `ID_publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `reactions_comments`
--
ALTER TABLE `reactions_comments`
  MODIFY `ID_reaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reactions_publications`
--
ALTER TABLE `reactions_publications`
  MODIFY `ID_reaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
  MODIFY `ID_topic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
