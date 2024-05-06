-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2024 a las 02:45:22
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
  `ID_topic` int(11) NOT NULL,
  `Image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publication`
--

INSERT INTO `publication` (`ID_publication`, `Title`, `Content`, `Date`, `Active`, `ID_user`, `ID_topic`, `Image`) VALUES
(1, 'HOLA MUNDO', 'Este es mi primer post, me alegra estar aqui', '10-04-2024 10:20 a.m.', 1, 2, 1, NULL),
(2, 'NATURALEZA PRECIOSA', 'El rescostarse debajo de un árbol y disfrutar de la sombra y el viento, es algo tan simple pero tan genial. ¿Porqué no proteger esto tan grandioso?', '12-04-2024 11:30 p.m.', 1, 3, 1, NULL),
(3, '¿EDUCACIÓN O ADOCTRINAMIENTO?', '¿El sistema educativo actual es de calidad o en realidad dirige a un adoctrinamiento para ser un empleado más?, Algo cuestionable desde hace tiempo es el hecho de que en la educación no hay materias tales como la Educación Financiera', '16-04-2024 07:30 p.m.', 1, 2, 1, NULL),
(4, 'SIMPLEMENTE HERMOSO', 'Amo correr en un campo abierto, sentirme libre y sin preocupaciones, simplemente es algo que causa un sentimiento satisfactorio', ' 25-04-2024 10:35 am', 1, 3, 1, NULL),
(26, 'CALOR 🥵', 'Cada año hace más calor', ' 02-05-2024 06:35 pm', 1, 18, 2, NULL),
(27, 'Publicacion de saul', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet tellus id nibh condimentum malesuada. Vestibulum dictum tellus pretium, aliquet nibh sed, pharetra orci. Duis quis quam ut velit malesuada fringilla. Mauris elementum hendrerit ante ac sollicitudin. Quisque nisi dui, fringilla ac accumsan id, blandit in velit. Donec posuere neque eu porttitor fermentum. Nunc blandit nibh ut nisl tincidunt, a ullamcorper nulla tristique. Nullam consequat felis eu ipsum varius tempor. Ut ut elit eget velit volutpat efficitur quis nec nisl. Quisque laoreet vestibulum velit, quis tempus erat placerat sed. Nam interdum ligula quis enim porta, a congue est tincidunt. Proin pulvinar, lorem a finibus congue, neque diam malesuada ex, a dictum ipsum tellus a nisl. Nam quis odio vestibulum, elementum nibh vel, rhoncus odio. Donec eleifend sagittis arcu aliquet pharetra. Aenean sed sem ut urna sagittis iaculis imperdiet vitae lectus. Sed sollicitudin laoreet diam, id luctus tortor aliquet ut.', ' 04-05-2024 05:45 pm', 1, 19, 3, NULL),
(28, 'Publicacion de Saul', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet tellus id nibh condimentum malesuada. Vestibulum dictum tellus pretium, aliquet nibh sed, pharetra orci. Duis quis quam ut velit malesuada fringilla. Mauris elementum hendrerit ante ac sollicitudin. Quisque nisi dui, fringilla ac accumsan id, blandit in velit. Donec posuere neque eu porttitor fermentum. Nunc blandit nibh ut nisl tincidunt, a ullamcorper nulla tristique. Nullam consequat felis eu ipsum varius tempor. Ut ut elit eget velit volutpat efficitur quis nec nisl. Quisque laoreet vestibulum velit, quis tempus erat placerat sed. Nam interdum ligula quis enim porta, a congue est tincidunt. Proin pulvinar, lorem a finibus congue, neque diam malesuada ex, a dictum ipsum tellus a nisl. Nam quis odio vestibulum, elementum nibh vel, rhoncus odio. Donec eleifend sagittis arcu aliquet pharetra. Aenean sed sem ut urna sagittis iaculis imperdiet vitae lectus. Sed sollicitudin laoreet diam, id luctus tortor aliquet ut.', ' 04-05-2024 05:46 pm', 1, 19, 3, NULL),
(29, 'Prueba1', 'qwertyuiopghyu', ' 04-05-2024 06:47 pm', 0, 19, 2, NULL),
(30, 'Prueba2: Imagen', 'aasasasas', ' 04-05-2024 07:43 pm', 1, 19, 1, 'code.png'),
(31, 'Prueba 3: Imagen', 'sdfvgbhnjmk', ' 04-05-2024 08:12 pm', 0, 19, 3, '_43e98328-9cc9-41df-b9b6-658fc278ff74.jpeg'),
(32, 'PRUEBA POST MERGE', 'DCFVGBHNJMK', ' 05-05-2024 06:39 pm', 1, 19, 1, '_ececc4fd-bf07-40fd-b4f8-57989c4f1cbb.jpeg');

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
(2, 'Wolfkarl', '$2y$10$tFbURbIWv7uC83aTJUryFOK1OWX7qP/92UDKCAXX/Qwv//gTqbidy', 'karlarmlp@gmail.com', NULL, 2),
(3, 'Alan VP', '$2y$10$lWeAGCYjB6tLNnBnOjglcewQles9D3IQu5PPdInRFgfXHbHxlo5YK', 'avargas39@ucol.mx', NULL, 2),
(18, 'Gabito', '$2y$10$g/Frv7pxE2QkrYrkjlwBFelz/1AxOXGMAs6mbyCR9QLMakbz8eF/W', 'lramirez68@ucol.mx', NULL, 2),
(19, 'Saul Bus', '$2y$10$qVdFwt/JkoG6bgMoPj.H4O1RKy2HDUiLoP/LHIbq6FBMcBrGTKJ9W', 'zaulbushta@gmail.com', NULL, 2);

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
  MODIFY `ID_publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
