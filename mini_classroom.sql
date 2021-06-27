/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mini_classroom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `class_meassges`
--

CREATE TABLE `class_meassges` (
  `id` int NOT NULL,
  `Assign_Name` varchar(1000) NOT NULL,
  `class_Id` varchar(1000) NOT NULL,
  `message_uniqueId` varchar(1000) NOT NULL,
  `message_sender_email` varchar(1000) NOT NULL,
  `message_sender_id` varchar(1000) NOT NULL,
  `message_sender` varchar(1000) NOT NULL,
  `message` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deadline_Time` varchar(1000) NOT NULL,
  `Time` varchar(1000) NOT NULL,
  `Assign_Points` varchar(200) NOT NULL,
  `message_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `file_uploads`
--

CREATE TABLE `file_uploads` (
  `id` int NOT NULL,
  `message_Id` varchar(1000) NOT NULL,
  `file_uniqueId` varchar(1000) NOT NULL,
  `file_Name` varchar(1000) NOT NULL,
  `file_Path` varchar(1000) NOT NULL,
  `sender_Name` varchar(1000) NOT NULL,
  `sender_Id` varchar(1000) NOT NULL,
  `Time` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peoples`
--

CREATE TABLE `peoples` (
  `id` int NOT NULL,
  `class_unique_id` varchar(800) NOT NULL,
  `class_name` varchar(800) NOT NULL,
  `class_material` varchar(1000) NOT NULL,
  `class_Section` varchar(1000) NOT NULL,
  `class_Desc` varchar(1000) NOT NULL,
  `class_Teacher` varchar(1000) NOT NULL,
  `person_name` varchar(800) NOT NULL,
  `person_uniqueId` varchar(800) NOT NULL,
  `person_email` varchar(800) NOT NULL,
  `person_status` varchar(800) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `unique_id` varchar(400) NOT NULL,
  `firstname` varchar(400) NOT NULL,
  `Lastname` varchar(400) NOT NULL,
  `email` varchar(400) NOT NULL,
  `password` varchar(400) NOT NULL,
  `photo` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `class_meassges`
--
ALTER TABLE `class_meassges`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `file_uploads`
--
ALTER TABLE `file_uploads`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `peoples`
--
ALTER TABLE `peoples`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `class_meassges`
--
ALTER TABLE `class_meassges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `file_uploads`
--
ALTER TABLE `file_uploads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `peoples`
--
ALTER TABLE `peoples`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
