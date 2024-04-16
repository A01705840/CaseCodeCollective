-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2024 a las 06:39:29
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
-- Base de datos: `leadsalesdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_usuario` (IN `uUsername` VARCHAR(30), IN `uCorreo` VARCHAR(100), IN `uNombre` VARCHAR(30), IN `uPassword` VARCHAR(400))  COMMENT 'leadsalesdb_registrar_usuario en signup' INSERT INTO usuario (UserName, Correo, Nombre, usuario.Password) VALUES (uUsername, uCorreo, uNombre, uPassword)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_default` (IN `uUsername` VARCHAR(30), IN `uFechaActualizacion` DATE, IN `uFechaUsuarioRol` DATE)   INSERT INTO usuario_tiene_rol (IDUsuario, IDRol, FechaUsuarioRol,FechaUsuarioRolActualizacion) 
VALUES (
    (SELECT U.IDUsuario FROM usuario U WHERE U.UserName = uUsername), 
    1, 
    NOW(),
    NOW()
)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcion`
--

CREATE TABLE `funcion` (
  `IDFuncion` int(10) NOT NULL,
  `Descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `funcion`
--

INSERT INTO `funcion` (`IDFuncion`, `Descripcion`) VALUES
(1, 'Iniciar Sesión.'),
(2, 'Cerrar sesión.'),
(3, 'Registrar Lead inorgánico individual.'),
(4, 'Consultar Lead individual inorgánico.'),
(5, 'Modificar Lead Individual.'),
(6, 'Eliminar Lead individual .'),
(7, 'Consultar reportes de Leads.'),
(8, 'Consultar gráficas propias.'),
(9, 'Registrar importación de CSV.'),
(10, 'Consultar Leads inorgánicos globales.'),
(11, 'Modificar Leads inorgánicos globales.'),
(12, 'Consultar leads.'),
(13, 'Modificar leads.'),
(14, 'Eliminar leads.'),
(15, 'Consultar Historial de reportes.'),
(16, 'Descargar historial de reportes de Leads.'),
(17, 'Consultar reportes de Leads.'),
(18, 'Descargar reportes de Leads.'),
(19, 'Registrar roles.'),
(20, 'Consultar roles.'),
(21, 'Modificar roles.'),
(22, 'Eliminar roles.'),
(23, 'Asignar rol.'),
(24, 'Registrar privilegios.'),
(25, 'Consultar privilegios'),
(26, 'Modificar privilegios.'),
(27, 'Eliminar privilegios.'),
(28, 'Asignar privilegios.'),
(29, 'Registrar cuenta.'),
(30, 'Crear usuario.'),
(31, 'Consultar usuarios.'),
(32, 'Eliminar Usuario.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leads`
--

CREATE TABLE `leads` (
  `IDLead` int(10) NOT NULL,
  `asignado_a` varchar(30) NOT NULL,
  `Telefono` bigint(13) DEFAULT NULL,
  `NombreLead` text DEFAULT NULL,
  `FechaPrimerMensaje` date NOT NULL,
  `Embudo` varchar(30) DEFAULT NULL,
  `Etapa` varchar(40) DEFAULT NULL,
  `Status` varchar(30) DEFAULT NULL,
  `Archivado` tinyint(1) DEFAULT NULL,
  `CreadoManual` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `leads`
--

INSERT INTO `leads` (`IDLead`, `asignado_a`, `Telefono`, `NombreLead`, `FechaPrimerMensaje`, `Embudo`, `Etapa`, `Status`, `Archivado`, `CreadoManual`) VALUES
(53, 'Daniel López Rodríguez', 5219651369383, 'Martín Utrilla.', '2022-08-27', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(55, 'Nicolás Pérez Sánchez', 5215510035165, 'Erizo 7 Agosto 2020', '2023-11-09', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(56, 'Laura Martínez López', 5216644513251, 'gregreg', '2024-02-22', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(57, 'Juan Sánchez Fernández', 5215554974011, '🚗', '2022-09-30', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(58, 'Ana García Rodríguez', 5214442452100, 'Sergio', '2025-06-11', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(59, 'Fernando Pérez Martínez', 5214792211296, 'efvbbb', '2024-01-08', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(60, 'Clara López García', 5217713305548, 'ññfffg', '2023-07-25', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(61, 'Ricardo Sánchez Pérez', 5217221066324, 'Fabiola Perez', '2024-03-19', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(62, 'Adriana Martínez López', 5213931323905, '👽', '2022-10-14', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(63, 'Diego Rodríguez García', 5212212037240, '₵Ⱨ₳₲ØɎ₳ ', '2025-05-02', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(64, 'Monse Serrano', 5217298473153, 'Gael Espinosa', '2023-12-07', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(65, 'Monse Serrano', 5217441808709, 'Nms', '2024-08-01', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(66, 'Alex Serrano', 5212217313794, 'Gilberto Duña', '2022-04-26', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(67, 'Alex Serrano', 5219811065049, 'hoilmaytiani', '2025-11-20', 'Erizoo México', 'Formas de pago  proceso', 'NEUTRAL', 1, 1),
(68, 'Monse Serrano', 5215582018124, 'Lagos', '2023-02-15', 'Erizoo México', 'Limpieza 1', 'STUCK', 1, 1),
(69, 'Alex Serrano', 5214773503336, 'Martil L King', '2024-09-09', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(70, 'Alex Serrano', 5214492804011, 'Dulce Esquivel 🖤', '2023-06-04', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(71, 'Paulina Garcia', 5217775071831, 'Melitza', '2023-09-15', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(72, 'Monse Serrano', 5218112165022, '24724 Pedro Garza Rodriguez', '2024-04-28', 'Erizoo México', 'Cliente Accesorios', 'NEUTRAL', 1, 1),
(73, 'Monse Serrano', 5215579237326, 'Miriam', '2025-07-11', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(74, 'Monse Serrano', 5217772092083, 'Mayra Ruiz Morales', '2026-03-19', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(75, 'Monse Serrano', 5214425459292, 'Martin Gomez', '2023-08-23', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(76, 'Paulina Garcia', 5214778801372, '#32191 María José Tejeda Villasana', '2024-05-03', 'Erizoo México', 'Cliente Accesorios', 'NEUTRAL', 1, 1),
(77, 'Paulina Garcia', 5217711942926, '⛑️Cristobal⛑️', '2023-12-18', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(78, 'Yael Gonzalez', 5215617463429, 'Silvia Pascu', '2022-08-27', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(79, 'Paulina Garcia', 5213328212290, 'Juan Ramón González Álvar', '2025-04-14', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(80, 'Paulina Garcia', 5217341871479, 'Gestoría Licencias🚗🚚🛻🏍️', '2023-11-09', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(81, 'Alex Serrano', 5215614163703, 'Jesus', '2024-02-22', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(82, 'Paulina Garcia', 5214681349755, 'Vane', '2022-09-30', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(83, 'Alex Serrano', 5218333356984, 'sof lop .m', '2025-06-11', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(84, 'Alex Serrano', 5214774106029, 'polipocket', '2024-01-08', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(85, 'Paulina Garcia', 5216621468857, 'Pedro Mora', '2023-07-25', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(86, 'Monse Serrano', 5215564031656, 'Querida Toña', '2024-03-19', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(87, 'Monse Serrano', 5218461139445, '22677 Danna Ximena Rivera Herbert', '2022-10-14', 'Erizoo México', 'Cliente Accesorios', 'NEUTRAL', 1, 1),
(88, 'Monse Serrano', 5215565139168, 'Renata', '2025-05-02', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(89, 'Paulina Garcia', 5215577584458, 'AN Uriel Ramirez', '2023-12-07', '🦔 Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(90, 'Alex Serrano', 5219995623592, 'Emmanuel Cruz', '2024-08-01', 'Erizoo México', 'Otros', 'NEUTRAL', 1, 1),
(91, 'Andrea', 5217771489082, 'juanmaldo3710', '2022-04-26', 'Erizoo México', 'Limpieza 1', 'NEUTRAL', 1, 1),
(92, 'Yael Gonzalez', 5213148726797, 'Xul@', '2025-11-20', 'Erizoo México', 'Limpieza 1', 'URGENT', 0, 0),
(93, 'Alex Serrano', 5215529428465, 'Fernanda 9 dic PAU', '2023-02-15', 'Erizoo México', 'Limpieza 2', 'URGENT', 1, 1),
(94, 'Paulina Garcia', 5212711477129, 'Isai Herrera... 🤠', '2024-09-09', 'Petciosos Menudeo', 'Limpieza 1', 'URGENT', 0, 0),
(95, 'Paulina Garcia', 5212464602763, '🦾', '2023-06-04', 'Erizoo México', 'Limpieza 1', 'URGENT', 0, 0),
(96, 'Andrea', 0, 'Valcolors', '2023-09-15', 'Petciosos', 'Limpieza 2', 'URGENT', 0, 0),
(97, 'Alex Serrano', 5212941094300, 'Angie', '2024-04-28', 'Erizoo México', 'Limpieza 1', 'URGENT', 0, 0),
(98, 'Andrea', 5216561828669, '𝑰𝒅𝒂𝒍𝒚 𝑺𝒐𝒕𝒐👑💘', '2025-07-11', 'Erizoo México', 'Limpieza 1', 'URGENT', 0, 0),
(99, 'Paulina Garcia', 5215581058799, 'Dania', '2026-03-19', 'Erizoo México', 'Limpieza 1', 'URGENT', 0, 0),
(100, 'Paulina Garcia', 5215581058799, 'Dania', '2026-03-19', 'Petciosos', '', 'URGENT', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IDRol` int(10) NOT NULL,
  `TipoRol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IDRol`, `TipoRol`) VALUES
(2, 'Admin'),
(3, 'Owner'),
(1, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_adquiere_funcion`
--

CREATE TABLE `rol_adquiere_funcion` (
  `IDRol` int(10) NOT NULL,
  `IDFuncion` int(10) NOT NULL,
  `FechaRolFuncion` datetime NOT NULL,
  `FechaRolFuncionActualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol_adquiere_funcion`
--

INSERT INTO `rol_adquiere_funcion` (`IDRol`, `IDFuncion`, `FechaRolFuncion`, `FechaRolFuncionActualizacion`) VALUES
(1, 1, '2023-06-12 00:00:00', '0000-00-00 00:00:00'),
(1, 2, '2025-11-03 00:00:00', '0000-00-00 00:00:00'),
(2, 3, '2024-09-19 00:00:00', '0000-00-00 00:00:00'),
(3, 3, '2024-04-29 00:00:00', '0000-00-00 00:00:00'),
(2, 4, '2026-05-28 00:00:00', '0000-00-00 00:00:00'),
(3, 4, '2024-04-30 00:00:00', '0000-00-00 00:00:00'),
(2, 5, '2023-03-07 00:00:00', '0000-00-00 00:00:00'),
(3, 5, '2024-05-01 00:00:00', '0000-00-00 00:00:00'),
(2, 6, '2027-10-14 00:00:00', '0000-00-00 00:00:00'),
(3, 6, '2024-05-02 00:00:00', '0000-00-00 00:00:00'),
(2, 7, '2025-08-22 00:00:00', '0000-00-00 00:00:00'),
(3, 7, '2024-05-03 00:00:00', '0000-00-00 00:00:00'),
(2, 8, '2028-04-30 00:00:00', '0000-00-00 00:00:00'),
(3, 8, '2024-05-04 00:00:00', '0000-00-00 00:00:00'),
(2, 9, '2023-01-09 00:00:00', '0000-00-00 00:00:00'),
(3, 9, '2024-05-05 00:00:00', '0000-00-00 00:00:00'),
(2, 10, '2024-07-18 00:00:00', '0000-00-00 00:00:00'),
(3, 10, '2024-05-06 00:00:00', '0000-00-00 00:00:00'),
(2, 11, '2026-12-25 00:00:00', '0000-00-00 00:00:00'),
(3, 11, '2024-05-07 00:00:00', '0000-00-00 00:00:00'),
(2, 12, '2023-09-01 00:00:00', '0000-00-00 00:00:00'),
(3, 12, '2024-05-08 00:00:00', '0000-00-00 00:00:00'),
(2, 13, '2027-06-10 00:00:00', '0000-00-00 00:00:00'),
(3, 13, '2024-05-09 00:00:00', '0000-00-00 00:00:00'),
(2, 14, '2024-03-27 00:00:00', '0000-00-00 00:00:00'),
(3, 14, '2024-05-10 00:00:00', '0000-00-00 00:00:00'),
(2, 15, '2028-11-05 00:00:00', '0000-00-00 00:00:00'),
(3, 15, '2024-05-11 00:00:00', '0000-00-00 00:00:00'),
(2, 16, '2025-02-13 00:00:00', '0000-00-00 00:00:00'),
(3, 16, '2024-05-12 00:00:00', '0000-00-00 00:00:00'),
(2, 17, '2026-10-21 00:00:00', '0000-00-00 00:00:00'),
(3, 17, '2024-05-13 00:00:00', '0000-00-00 00:00:00'),
(2, 18, '2023-08-06 00:00:00', '0000-00-00 00:00:00'),
(3, 18, '2024-05-14 00:00:00', '0000-00-00 00:00:00'),
(2, 19, '2027-04-15 00:00:00', '0000-00-00 00:00:00'),
(3, 19, '2024-05-15 00:00:00', '0000-00-00 00:00:00'),
(2, 20, '2025-12-24 00:00:00', '0000-00-00 00:00:00'),
(3, 20, '2024-05-16 00:00:00', '0000-00-00 00:00:00'),
(2, 21, '2024-02-08 00:00:00', '0000-00-00 00:00:00'),
(3, 21, '2024-05-17 00:00:00', '0000-00-00 00:00:00'),
(2, 22, '2024-03-15 00:00:00', '0000-00-00 00:00:00'),
(3, 22, '2024-05-18 00:00:00', '0000-00-00 00:00:00'),
(2, 23, '2024-04-20 00:00:00', '0000-00-00 00:00:00'),
(3, 23, '2024-05-19 00:00:00', '0000-00-00 00:00:00'),
(2, 24, '2024-05-25 00:00:00', '0000-00-00 00:00:00'),
(3, 24, '2024-05-20 00:00:00', '0000-00-00 00:00:00'),
(2, 25, '2024-06-30 00:00:00', '0000-00-00 00:00:00'),
(3, 25, '2024-05-21 00:00:00', '0000-00-00 00:00:00'),
(2, 26, '2024-08-04 00:00:00', '0000-00-00 00:00:00'),
(3, 26, '2024-05-22 00:00:00', '0000-00-00 00:00:00'),
(2, 27, '2024-09-09 00:00:00', '0000-00-00 00:00:00'),
(3, 27, '2024-05-23 00:00:00', '0000-00-00 00:00:00'),
(2, 28, '2024-10-14 00:00:00', '0000-00-00 00:00:00'),
(3, 28, '2024-05-24 00:00:00', '0000-00-00 00:00:00'),
(3, 29, '2024-05-25 00:00:00', '0000-00-00 00:00:00'),
(3, 30, '2024-06-30 00:00:00', '0000-00-00 00:00:00'),
(3, 31, '2024-08-04 00:00:00', '0000-00-00 00:00:00'),
(3, 32, '2024-09-09 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IDUsuario` int(10) NOT NULL,
  `UserName` varchar(30) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Password` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IDUsuario`, `UserName`, `Correo`, `Nombre`, `Password`) VALUES
(1, 'Kevin12389', 'kevinmleyva@gmail.com', 'Kevin Josué Martínez Leyva', 'kevin1234'),
(2, 'MonseS', '2@ignorar.com', 'Monse Serrano', ''),
(3, 'Alex_Serrano', '3@ignorar.com', 'Alex Serrano', ''),
(4, 'PauGr', '4@ignorar.com', 'Paulina Garcia', ''),
(5, 'YaelGonazl12', '5@ignorar.com', 'Yael Gonzalez', ''),
(6, 'Andy123', '6@ignorar.com', 'Andrea', ''),
(7, 'jose_lm', '7@ignorar.com', 'José López Martínez', ''),
(8, 'andres_pr', '8@ignorar.com', 'Andrés Pérez Rodríguez', ''),
(9, 'sofia_gs', '9@ignorar.com', 'Sofía González Sánchez', ''),
(10, 'santiago_rl', '10@ignorar.com', 'Santiago Ruiz López', ''),
(11, 'lucia_mf', '11@ignorar.com', 'Lucía Martínez Fernández', ''),
(12, 'alejandro_hp', '12@ignorar.com', 'Alejandro Hernández Pérez', ''),
(13, 'valentina_dm', '13@ignorar.com', 'Valentina Díaz Martínez', ''),
(14, 'javier_ts', '14@ignorar.com', 'Javier Torres Sánchez', ''),
(15, 'gabriela_pl', '15@ignorar.com', 'Gabriela Pérez López', ''),
(16, 'carlos_rf', '16@ignorar.com', 'Carlos Rodríguez Fernández', ''),
(17, 'elena_gp', '17@ignorar.com', 'Elena García Pérez', ''),
(18, 'antonio_mg', '18@ignorar.com', 'Antonio Martínez González', ''),
(19, 'camila_sl', '19@ignorar.com', 'Camila Sánchez López', ''),
(20, 'daniel_lr', '20@ignorar.com', 'Daniel López Rodríguez', ''),
(21, 'isabel_gm', '21@ignorar.com', 'Isabel García Martínez', ''),
(22, 'nicolas_ps', '22@ignorar.com', 'Nicolás Pérez Sánchez', ''),
(23, 'laura_ml', '23@ignorar.com', 'Laura Martínez López', ''),
(24, 'juan_sf', '24@ignorar.com', 'Juan Sánchez Fernández', ''),
(25, 'ana_gr', '25@ignorar.com', 'Ana García Rodríguez', ''),
(26, 'fernando_pm', '26@ignorar.com', 'Fernando Pérez Martínez', ''),
(27, 'clara_lg', '27@ignorar.com', 'Clara López García', ''),
(28, 'ricardo_sp', '28@ignorar.com', 'Ricardo Sánchez Pérez', ''),
(29, 'adriana_ml', '29@ignorar.com', 'Adriana Martínez López', ''),
(30, 'diego_rg', '30@ignorar.com', 'Diego Rodríguez García', ''),
(31, 'natalia_lm', '31@ignorar.com', 'Natalia López Martínez', ''),
(32, 'manuel_gs', '32@ignorar.com', 'Manuel García Sánchez', ''),
(33, 'paula_pl', '33@ignorar.com', 'Paula Pérez López', ''),
(34, 'pedro_ms', '34@ignorar.com', 'Pedro Martínez Sánchez', ''),
(35, 'marta_rg', '35@ignorar.com', 'Marta Rodríguez García', ''),
(36, 'addNewUser6@gmail.com', 'addNewUser6@gmail.com', 'addNewUser6@gmail.com', 'addNewUser6@gmail.com'),
(37, 'addNewUser4@gmail.com', 'addNewUser4@gmail.com', 'addNewUser4@gmail.com', '$2a$12$tZ63bDFDhwAGnwpRFma.4.PMDF3u2KMUn0Kb.iIoGhUD9cdenDTSu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tiene_rol`
--

CREATE TABLE `usuario_tiene_rol` (
  `IDUsuario` int(10) NOT NULL,
  `IDRol` int(10) NOT NULL,
  `FechaUsuarioRol` date NOT NULL,
  `FechaUsuarioRolActualizacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario_tiene_rol`
--

INSERT INTO `usuario_tiene_rol` (`IDUsuario`, `IDRol`, `FechaUsuarioRol`, `FechaUsuarioRolActualizacion`) VALUES
(1, 1, '2024-05-03', '0000-00-00'),
(2, 1, '2023-12-18', '0000-00-00'),
(3, 1, '2022-08-27', '0000-00-00'),
(4, 2, '2025-04-14', '0000-00-00'),
(5, 2, '2023-11-09', '0000-00-00'),
(6, 2, '2024-02-22', '0000-00-00'),
(7, 2, '2022-09-30', '0000-00-00'),
(8, 2, '2025-06-11', '0000-00-00'),
(9, 2, '2024-01-08', '0000-00-00'),
(10, 2, '2023-07-25', '0000-00-00'),
(11, 2, '2024-03-19', '0000-00-00'),
(12, 2, '2022-10-14', '0000-00-00'),
(13, 2, '2025-05-02', '0000-00-00'),
(14, 2, '2023-12-07', '0000-00-00'),
(15, 1, '2024-08-01', '2024-04-14'),
(16, 2, '2022-04-26', '0000-00-00'),
(17, 2, '2025-11-20', '0000-00-00'),
(18, 2, '2023-02-15', '0000-00-00'),
(19, 2, '2024-09-09', '0000-00-00'),
(20, 2, '2023-06-04', '0000-00-00'),
(21, 3, '2023-09-15', '0000-00-00'),
(22, 1, '2024-04-28', '0000-00-00'),
(23, 1, '2025-07-11', '0000-00-00'),
(24, 1, '2026-03-19', '0000-00-00'),
(25, 1, '2023-08-23', '0000-00-00'),
(36, 3, '2024-04-10', '2024-04-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `version`
--

CREATE TABLE `version` (
  `IDVersion` int(10) NOT NULL,
  `IDUsuario` int(10) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `NombreVersion` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `version`
--

INSERT INTO `version` (`IDVersion`, `IDUsuario`, `FechaCreacion`, `NombreVersion`) VALUES
(1, 4, '2024-01-01 06:00:00', 'Versión'),
(2, 5, '2024-02-05 06:00:00', 'Versión 1.'),
(3, 6, '2024-03-10 06:00:00', 'Versión 1.'),
(4, 4, '2024-04-15 06:00:00', 'Versión'),
(5, 5, '2024-05-20 06:00:00', 'Versión 1.'),
(6, 6, '2024-06-25 06:00:00', 'Versión 1.'),
(7, 7, '2024-07-30 06:00:00', 'Versión'),
(8, 8, '2024-08-04 06:00:00', 'Versión 1.'),
(9, 9, '2024-09-09 06:00:00', 'Versión 1.'),
(10, 10, '2024-10-14 06:00:00', 'Versión'),
(11, 11, '2024-11-19 06:00:00', 'Versión 1.'),
(12, 12, '2024-12-24 06:00:00', 'Versión 1.'),
(13, 13, '2025-01-01 06:00:00', 'Versión'),
(14, 14, '2025-02-05 06:00:00', 'Versión 1.'),
(15, 15, '2025-03-10 06:00:00', 'Versión 1.'),
(16, 16, '2025-04-15 06:00:00', 'Versión'),
(17, 17, '2025-05-20 06:00:00', 'Versión 1.1'),
(18, 18, '2025-06-25 06:00:00', 'Versión 1.1'),
(19, 19, '2025-07-30 06:00:00', 'Versión'),
(20, 20, '2025-08-04 06:00:00', 'Versión 1.1'),
(21, 11, '2023-07-11 06:00:00', 'Versión 1.1'),
(22, 12, '2024-09-25 06:00:00', 'Versión'),
(23, 13, '2025-05-03 06:00:00', 'Versión 1.1'),
(24, 14, '2022-12-16 06:00:00', 'Versión 1.1'),
(25, 15, '2026-02-09 06:00:00', 'Versión'),
(26, 16, '2023-08-28 06:00:00', 'Versión 1.1'),
(27, 17, '2025-06-14 06:00:00', 'Versión 1.1'),
(28, 18, '2024-11-20 06:00:00', 'Versión 1'),
(29, 19, '2026-03-05 06:00:00', 'Versión 1.1'),
(30, 20, '2022-10-22 06:00:00', 'Versión 1.1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `version_almacena_leads`
--

CREATE TABLE `version_almacena_leads` (
  `IDVersion` int(10) NOT NULL,
  `IDLead` int(10) NOT NULL,
  `FechaVersionAlmacenaLead` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funcion`
--
ALTER TABLE `funcion`
  ADD PRIMARY KEY (`IDFuncion`);

--
-- Indices de la tabla `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`IDLead`),
  ADD KEY `fk_nombre_constraint` (`asignado_a`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IDRol`),
  ADD UNIQUE KEY `unique_rol` (`TipoRol`);

--
-- Indices de la tabla `rol_adquiere_funcion`
--
ALTER TABLE `rol_adquiere_funcion`
  ADD PRIMARY KEY (`IDFuncion`,`IDRol`,`FechaRolFuncion`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDUsuario`),
  ADD UNIQUE KEY `nombre_unico` (`Nombre`),
  ADD UNIQUE KEY `correo_unico` (`Correo`),
  ADD UNIQUE KEY `unique_username` (`UserName`);

--
-- Indices de la tabla `usuario_tiene_rol`
--
ALTER TABLE `usuario_tiene_rol`
  ADD PRIMARY KEY (`IDUsuario`,`IDRol`,`FechaUsuarioRol`),
  ADD KEY `IDRol` (`IDRol`);

--
-- Indices de la tabla `version`
--
ALTER TABLE `version`
  ADD PRIMARY KEY (`IDVersion`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indices de la tabla `version_almacena_leads`
--
ALTER TABLE `version_almacena_leads`
  ADD PRIMARY KEY (`IDVersion`,`IDLead`,`FechaVersionAlmacenaLead`),
  ADD KEY `IDLead` (`IDLead`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funcion`
--
ALTER TABLE `funcion`
  MODIFY `IDFuncion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `leads`
--
ALTER TABLE `leads`
  MODIFY `IDLead` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `IDRol` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `version`
--
ALTER TABLE `version`
  MODIFY `IDVersion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `fk_nombre_constraint` FOREIGN KEY (`asignado_a`) REFERENCES `usuario` (`Nombre`);

--
-- Filtros para la tabla `rol_adquiere_funcion`
--
ALTER TABLE `rol_adquiere_funcion`
  ADD CONSTRAINT `rol_adquiere_funcion_ibfk_1` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`),
  ADD CONSTRAINT `rol_adquiere_funcion_ibfk_2` FOREIGN KEY (`IDFuncion`) REFERENCES `funcion` (`IDFuncion`);

--
-- Filtros para la tabla `usuario_tiene_rol`
--
ALTER TABLE `usuario_tiene_rol`
  ADD CONSTRAINT `usuario_tiene_rol_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  ADD CONSTRAINT `usuario_tiene_rol_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`);

--
-- Filtros para la tabla `version`
--
ALTER TABLE `version`
  ADD CONSTRAINT `version_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`);

--
-- Filtros para la tabla `version_almacena_leads`
--
ALTER TABLE `version_almacena_leads`
  ADD CONSTRAINT `version_almacena_leads_ibfk_1` FOREIGN KEY (`IDVersion`) REFERENCES `version` (`IDVersion`),
  ADD CONSTRAINT `version_almacena_leads_ibfk_2` FOREIGN KEY (`IDLead`) REFERENCES `leads` (`IDLead`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
