
INSERT INTO `backend_appetito_admin` (`id`, `nombre`, `address`, `email`, `password`, `phone_number`, `photo`) VALUES
(7, 'Brian Esquivel Barba', 'José Isabel Robles 110', 'brian@gmail.com', 'Brian123', '4495547097', 'photos/photo_1699857439018.jpeg'),
(8, 'Thaily Gonzalez', 'Salvador Aguilera Padilla #206', 'thaily@gmail.com', 'Thaily123', '4495098341', 'photos/Thai.jpeg'),
(9, 'Zarah Cornejo', 'Russelo', 'zarah@gmail.com', 'Zarah123', '4491054246', 'photos/Zarah.jpeg');



INSERT INTO `backend_appetito_categories` (`id`, `name`, `description`, `image`) VALUES
(2, 'Pizza', 'Pide tu rica pizza en estos restaurantes', 'photos/Pizza.jpg'),
(3, 'Hamburguesas', 'Pide tus ricas hamburguesas en estos restaurantes', 'photos/Hamburguesas.jpg'),
(4, 'Sushi', 'Pide tu rico sushi en estos restaurantes', 'photos/sushi.jpg'),
(7, 'Perritos', 'Perros para navidad', 'photos/photo_1701264423149.png');


INSERT INTO `backend_appetito_foods` (`id`, `name`, `description`, `price`, `restaurant_id`, `image`) VALUES
(2, 'Pizza de peperonni', 'Pizza de peperonni muy rica', 99, 2, 'photos/Little-PizzaPeperoni.jpg'),
(3, 'Pizza Hawaiana', 'Pizza hawaiana muy rica', 149, 2, 'photos/Little-PizzaHawaiana.jpg'),
(4, 'Pizza de 3 carnes', 'Pizza de 3 carnes muy rica', 169, 2, 'photos/Little-Pizza3Carnes.jpg'),
(5, 'Pizza Peperoni', 'Pizza de peperonni muy rica', 85, 3, 'photos/domi-PizzaPeperoni.jpeg'),
(6, 'Pizza Hawaiana', 'Pizza hawaiana muy rica', 170, 3, 'photos/domi-PizzaHawaiana.jpg'),
(7, 'Pizza Mexicana', 'Pizza mexicana muy rica', 169, 3, 'photos/domi-PizzaMexina.jpg'),
(8, 'Pizza Mexicana', 'Pizza mexicana muy rica', 179, 4, 'photos/Hut-PizzaMexa.jpeg'),
(9, 'Pizza Peperoni', 'Pizza de peperonni muy rica', 89, 4, 'photos/Hut-PizzaPeperoni.jpeg'),
(10, 'Pizza Hawaiana', 'Pizza hawaiana muy rica', 149, 4, 'photos/Hut-PizzaHawaiana.jpg'),
(11, 'Super Star', 'Hamburguesa clasica', 120, 5, 'photos/carls-super.jpg'),
(12, 'Famous Star', 'Hamburguesa clasica senciñña', 95, 5, 'photos/carls-Famous.jpg'),
(13, 'Western Bacon', 'Hamburguesa con tocino rico', 110, 5, 'photos/carls-WesternBacon.jpg'),
(14, 'Whopper combo', 'Combo completo Whopper', 105, 6, 'photos/king-whopperCombo.jpg'),
(15, 'Stacker King', 'Combo de hamburguesa con bacon', 139, 6, 'photos/king-SatackerKing.jpeg'),
(16, 'Family king', 'Para toda la familia', 269, 6, 'photos/king-FamilyKing.jpg'),
(17, 'McFlurry', 'Nievecita rica', 40, 7, 'photos/mcd-mcFlurry.jpg'),
(18, 'McTrio', 'Combo Hamburguesa, papas y refresco', 120, 7, 'photos/MCD-MCTRIO.png'),
(19, 'Combo Kids', 'Combo para los peques', 139, 7, 'photos/MCD-combokids.jpg'),
(20, 'Tradicional', 'Sushi tradicional japones', 120, 8, 'photos/Tradicional1.jpg'),
(21, 'Filadelfia Nevado', 'sushi con queso filadelfia', 149, 8, 'photos/Filadelfia_nevado1.jpg'),
(22, 'Mango Kush', 'Sushi tropicalizado con mango', 189, 8, 'photos/MangoKush1.jpg'),
(23, 'Tradicional', 'Sushi tradicional japones', 105, 9, 'photos/Tradicional2.jpg'),
(24, 'Filadelfia Nevado', 'sushi con queso filadelfia', 139, 9, 'photos/FiladelfiaNevado2.jpg'),
(25, 'Mango Kush', 'Sushi tropicalizado con mango', 209, 9, 'photos/MangoKush2.jpg'),
(26, 'Tradicional', 'Sushi tradicional japones', 99, 10, 'photos/Tradicional3.jpg'),
(27, 'Filadelfia Nevado', 'sushi con queso filadelfia', 129, 10, 'photos/FiladelfiaNevado3.jpg'),
(28, 'Mango Kush', 'Sushi tropicalizado con mango', 209, 10, 'photos/MangoKush3.jpg');


INSERT INTO `backend_appetito_locations` (`id`, `address`, `addressNumber`, `description`, `user_id`) VALUES
(1, 'Lopez Mateos', '#56C', 'Casa de dos pisos con porton blanco', 4),
(2, 'Gomez Morin', '#456', 'Hay un perro chihuahua en la cochera', 5),
(3, 'Pintores Gomez', '#390', 'Casa pintada de azul', 6),
(6, 'José palomino dena', '124', 'Casa bonita', 4),
(7, 'Rancho 2', '100', 'Casa de dos pisos', 12);


INSERT INTO `backend_appetito_orders` (`id`, `total`, `location_id`, `paymentMethod_id`, `user_id`) VALUES
(2, 198, 1, 6, 4),
(3, 198, 6, 2, 4),
(4, 0, 6, 2, 4),
(5, 120, 1, 6, 4),
(6, 337, 1, 6, 4),
(8, 549, 7, 7, 12);


INSERT INTO `backend_appetito_paymentmethod` (`id`, `cardNumber`, `expiredDate`, `securityCode`, `user_id`) VALUES
(2, '1245321456207900', '2025-08-10', '541', 4),
(3, '6421503461875430', '2026-05-21', '012', 5),
(4, '5127948288495013', '2025-12-22', '999', 6),
(6, '1828828384', '2025-09-11', '009', 4),
(7, '0000000000000', '2023-09-10', '000', 12);


INSERT INTO `backend_appetito_restaurants` (`id`, `name`, `description`, `Location`, `branches`, `categories_id`, `image`) VALUES
(2, 'Little ceasars', 'La pizza mas barata de México', 'Mexico', '500', 2, 'photos/LittleCaesars.jpeg'),
(3, 'Dominos', 'La pizza mas rica de México', 'Mexico and USA', '1000', 2, 'photos/Dominos.png'),
(4, 'PizzaHut', 'La pizza mas rapida de México', 'MEXICO', '400', 2, 'photos/PizzaHut.png'),
(5, 'Carls Jr', 'Las hamburguesas más ricas de México', 'Mexico', '4000', 3, 'photos/Carls-Jr.-Logo.png'),
(6, 'Burger King', 'Hamburguesas al carbon', 'Mexico', '1000', 3, 'photos/burgerKing.png'),
(7, 'McDonals', 'McTrio toda la semana', 'USA', '1000', 3, 'photos/mcdonals.png'),
(8, 'Kapital Sushi', 'Sushis Mexicanizados', 'Mexico', '500', 4, 'photos/KapitalSushi.jpeg'),
(9, 'SushiTai', 'Sushi 100% oriental', 'Altaria', '50', 4, 'photos/sushital.jpeg'),
(10, 'SushiRoll', 'Los sushis más redonditos', 'México', '400', 4, 'photos/sushirol.png');


INSERT INTO `backend_appetito_user` (`id`, `nombre`, `email`, `password`, `phone_number`, `photo`) VALUES
(4, 'Juan Jose', 'juan@gmail.com', 'Juan123', '5412012365', 'photos/Juan.jpg'),
(5, 'Luis Romo', 'luis@gmail.com', 'Luis123', '4495412012', 'photos/Luis.jpg'),
(6, 'Romina Nuñez', 'romina@gmail.com', 'Romina123', '4498888896', 'photos/Romina.png'),
(12, 'Jorge Dzul', 'Jorgue@gmail.com', 'Jorge00', '4490000000', 'photos/photo_1701264023360.png');


INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2023-11-12 02:13:17.874157', '7', 'Admin object (7)', 1, '[{\"added\": {}}]', 7, 1),
(2, '2023-11-12 02:18:29.318444', '8', 'Admin object (8)', 1, '[{\"added\": {}}]', 7, 1),
(3, '2023-11-12 02:19:38.266829', '9', 'Admin object (9)', 1, '[{\"added\": {}}]', 7, 1),
(4, '2023-11-12 02:25:48.160625', '4', 'User object (4)', 1, '[{\"added\": {}}]', 8, 1),
(5, '2023-11-12 02:26:27.651146', '5', 'User object (5)', 1, '[{\"added\": {}}]', 8, 1),
(6, '2023-11-12 02:27:37.326999', '6', 'User object (6)', 1, '[{\"added\": {}}]', 8, 1),
(7, '2023-11-12 02:29:57.802695', '1', 'Locations object (1)', 1, '[{\"added\": {}}]', 9, 1),
(8, '2023-11-12 02:30:37.355242', '2', 'Locations object (2)', 1, '[{\"added\": {}}]', 9, 1),
(9, '2023-11-12 02:31:20.410663', '3', 'Locations object (3)', 1, '[{\"added\": {}}]', 9, 1),
(10, '2023-11-12 02:37:12.001802', '2', 'PaymentMethod object (2)', 1, '[{\"added\": {}}]', 10, 1),
(11, '2023-11-12 02:37:46.694196', '3', 'PaymentMethod object (3)', 1, '[{\"added\": {}}]', 10, 1),
(12, '2023-11-12 02:38:17.418689', '4', 'PaymentMethod object (4)', 1, '[{\"added\": {}}]', 10, 1),
(13, '2023-11-12 02:41:19.084988', '2', 'Categories object (2)', 1, '[{\"added\": {}}]', 11, 1),
(14, '2023-11-12 02:48:26.186967', '3', 'Categories object (3)', 1, '[{\"added\": {}}]', 11, 1),
(15, '2023-11-12 02:49:26.473321', '4', 'Categories object (4)', 1, '[{\"added\": {}}]', 11, 1),
(16, '2023-11-12 02:58:13.348374', '2', 'Restaurants object (2)', 1, '[{\"added\": {}}]', 12, 1),
(17, '2023-11-12 02:59:03.937302', '3', 'Restaurants object (3)', 1, '[{\"added\": {}}]', 12, 1),
(18, '2023-11-12 03:00:08.530917', '4', 'Restaurants object (4)', 1, '[{\"added\": {}}]', 12, 1),
(19, '2023-11-12 03:04:27.505967', '5', 'Restaurants object (5)', 1, '[{\"added\": {}}]', 12, 1),
(20, '2023-11-12 03:05:08.479618', '6', 'Restaurants object (6)', 1, '[{\"added\": {}}]', 12, 1),
(21, '2023-11-12 03:05:45.101128', '7', 'Restaurants object (7)', 1, '[{\"added\": {}}]', 12, 1),
(22, '2023-11-12 03:06:29.124870', '8', 'Restaurants object (8)', 1, '[{\"added\": {}}]', 12, 1),
(23, '2023-11-12 03:06:55.839455', '9', 'Restaurants object (9)', 1, '[{\"added\": {}}]', 12, 1),
(24, '2023-11-12 03:07:39.954219', '10', 'Restaurants object (10)', 1, '[{\"added\": {}}]', 12, 1),
(25, '2023-11-12 03:18:59.702097', '2', 'Foods object (2)', 1, '[{\"added\": {}}]', 13, 1),
(26, '2023-11-12 03:19:39.292127', '3', 'Foods object (3)', 1, '[{\"added\": {}}]', 13, 1),
(27, '2023-11-12 03:20:19.922183', '4', 'Foods object (4)', 1, '[{\"added\": {}}]', 13, 1),
(28, '2023-11-12 03:25:56.001441', '5', 'Foods object (5)', 1, '[{\"added\": {}}]', 13, 1),
(29, '2023-11-12 03:28:55.839419', '6', 'Foods object (6)', 1, '[{\"added\": {}}]', 13, 1),
(30, '2023-11-12 03:29:35.974522', '7', 'Foods object (7)', 1, '[{\"added\": {}}]', 13, 1),
(31, '2023-11-12 03:36:39.499892', '8', 'Foods object (8)', 1, '[{\"added\": {}}]', 13, 1),
(32, '2023-11-12 03:37:53.715994', '9', 'Foods object (9)', 1, '[{\"added\": {}}]', 13, 1),
(33, '2023-11-12 03:38:20.327753', '10', 'Foods object (10)', 1, '[{\"added\": {}}]', 13, 1),
(34, '2023-11-12 03:46:22.558794', '11', 'Foods object (11)', 1, '[{\"added\": {}}]', 13, 1),
(35, '2023-11-12 03:46:59.697547', '12', 'Foods object (12)', 1, '[{\"added\": {}}]', 13, 1),
(36, '2023-11-12 03:47:35.492337', '13', 'Foods object (13)', 1, '[{\"added\": {}}]', 13, 1),
(37, '2023-11-12 03:51:23.204136', '14', 'Foods object (14)', 1, '[{\"added\": {}}]', 13, 1),
(38, '2023-11-12 03:52:20.250909', '15', 'Foods object (15)', 1, '[{\"added\": {}}]', 13, 1),
(39, '2023-11-12 03:53:11.345580', '16', 'Foods object (16)', 1, '[{\"added\": {}}]', 13, 1),
(40, '2023-11-12 03:58:03.209235', '17', 'Foods object (17)', 1, '[{\"added\": {}}]', 13, 1),
(41, '2023-11-12 03:59:29.331953', '18', 'Foods object (18)', 1, '[{\"added\": {}}]', 13, 1),
(42, '2023-11-12 04:00:08.164760', '19', 'Foods object (19)', 1, '[{\"added\": {}}]', 13, 1),
(43, '2023-11-12 04:09:08.105787', '20', 'Foods object (20)', 1, '[{\"added\": {}}]', 13, 1),
(44, '2023-11-12 04:09:33.202443', '21', 'Foods object (21)', 1, '[{\"added\": {}}]', 13, 1),
(45, '2023-11-12 04:09:54.368582', '22', 'Foods object (22)', 1, '[{\"added\": {}}]', 13, 1),
(46, '2023-11-12 04:10:20.863397', '23', 'Foods object (23)', 1, '[{\"added\": {}}]', 13, 1),
(47, '2023-11-12 04:10:38.481336', '24', 'Foods object (24)', 1, '[{\"added\": {}}]', 13, 1),
(48, '2023-11-12 04:10:57.620304', '25', 'Foods object (25)', 1, '[{\"added\": {}}]', 13, 1),
(49, '2023-11-12 04:11:19.250586', '26', 'Foods object (26)', 1, '[{\"added\": {}}]', 13, 1),
(50, '2023-11-12 04:11:34.649925', '27', 'Foods object (27)', 1, '[{\"added\": {}}]', 13, 1),
(51, '2023-11-12 04:11:54.908420', '28', 'Foods object (28)', 1, '[{\"added\": {}}]', 13, 1),
(52, '2023-11-15 05:14:38.067134', '1', 'Orders object (1)', 1, '[{\"added\": {}}]', 16, 1);


INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(14, 'authtoken', 'token'),
(15, 'authtoken', 'tokenproxy'),
(7, 'Backend_AppEtito', 'admin'),
(11, 'Backend_AppEtito', 'categories'),
(13, 'Backend_AppEtito', 'foods'),
(9, 'Backend_AppEtito', 'locations'),
(16, 'Backend_AppEtito', 'orders'),
(10, 'Backend_AppEtito', 'paymentmethod'),
(12, 'Backend_AppEtito', 'restaurants'),
(8, 'Backend_AppEtito', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');


INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'Backend_AppEtito', '0001_initial', '2023-10-24 03:47:50.765113'),
(2, 'contenttypes', '0001_initial', '2023-10-24 03:47:53.681244'),
(3, 'auth', '0001_initial', '2023-10-24 03:48:42.561640'),
(4, 'admin', '0001_initial', '2023-10-24 03:48:52.991239'),
(5, 'admin', '0002_logentry_remove_auto_add', '2023-10-24 03:48:53.566356'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2023-10-24 03:48:53.832478'),
(7, 'contenttypes', '0002_remove_content_type_name', '2023-10-24 03:49:00.349219'),
(8, 'auth', '0002_alter_permission_name_max_length', '2023-10-24 03:49:08.190437'),
(9, 'auth', '0003_alter_user_email_max_length', '2023-10-24 03:49:09.302157'),
(10, 'auth', '0004_alter_user_username_opts', '2023-10-24 03:49:09.478247'),
(11, 'auth', '0005_alter_user_last_login_null', '2023-10-24 03:49:14.419174'),
(12, 'auth', '0006_require_contenttypes_0002', '2023-10-24 03:49:14.627738'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2023-10-24 03:49:15.413254'),
(14, 'auth', '0008_alter_user_username_max_length', '2023-10-24 03:49:19.744941'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2023-10-24 03:49:25.407839'),
(16, 'auth', '0010_alter_group_name_max_length', '2023-10-24 03:49:26.131637'),
(17, 'auth', '0011_update_proxy_permissions', '2023-10-24 03:49:26.533239'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2023-10-24 03:49:32.620870'),
(19, 'sessions', '0001_initial', '2023-10-24 03:49:36.593072'),
(20, 'Backend_AppEtito', '0002_user', '2023-10-24 04:31:58.410618'),
(21, 'authtoken', '0001_initial', '2023-10-24 05:35:20.577940'),
(22, 'authtoken', '0002_auto_20160226_1747', '2023-10-24 05:35:20.871933'),
(23, 'authtoken', '0003_tokenproxy', '2023-10-24 05:35:21.242345'),
(24, 'Backend_AppEtito', '0003_alter_admin_password_alter_user_password_locations', '2023-11-01 17:07:54.333835'),
(25, 'Backend_AppEtito', '0004_rename_iduser_locations_user', '2023-11-01 17:10:32.026595'),
(26, 'Backend_AppEtito', '0005_paymentmethod', '2023-11-01 17:48:18.117787'),
(27, 'Backend_AppEtito', '0006_categories', '2023-11-01 18:02:15.672589'),
(28, 'Backend_AppEtito', '0007_restaurants_foods', '2023-11-01 18:46:31.075278'),
(29, 'Backend_AppEtito', '0008_foods_image_restaurants_image', '2023-11-01 18:57:22.915421'),
(30, 'Backend_AppEtito', '0009_alter_admin_photo_alter_categories_image_and_more', '2023-11-13 05:17:32.309218'),
(31, 'Backend_AppEtito', '0010_orders', '2023-11-15 05:09:56.570371');


INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('2qaeftno17deen5p27pyq522ni1u8rj3', '.eJxVjDsOwjAQBe_iGlm7G9tLKOlzBstfHEC2FCcV4u4QKQW0b2beS1i3rcVuPS12juIiUJx-N-_CI9UdxLurtyZDq-sye7kr8qBdTi2m5_Vw_w6K6-Vbe6I8EGompZQGrxhGyMEEd0ZmHNlEUFmrPAAZgwEhEpMmAq8zBS3eH58wNgc:1r1zlW:wF089ksJ9J10kYStYKnUtf3U5QIY4g2_CU0tU1-2ii4', '2023-11-26 01:59:58.378087'),
('b2ufdtajo8po2awbbwvqfuif6nz7ffuc', '.eJxVjDsOwjAQBe_iGlm7G9tLKOlzBstfHEC2FCcV4u4QKQW0b2beS1i3rcVuPS12juIiUJx-N-_CI9UdxLurtyZDq-sye7kr8qBdTi2m5_Vw_w6K6-Vbe6I8EGompZQGrxhGyMEEd0ZmHNlEUFmrPAAZgwEhEpMmAq8zBS3eH58wNgc:1r38Dp:-6oVl8hQseN085hpLPzClgOLkP_Tg5JoCga_L2Q6H-w', '2023-11-29 05:13:53.623074'),
('qetf637b2vhamcox0tkloby1pmxgywlu', '.eJxVjDsOwjAQBe_iGlm7G9tLKOlzBstfHEC2FCcV4u4QKQW0b2beS1i3rcVuPS12juIiUJx-N-_CI9UdxLurtyZDq-sye7kr8qBdTi2m5_Vw_w6K6-Vbe6I8EGompZQGrxhGyMEEd0ZmHNlEUFmrPAAZgwEhEpMmAq8zBS3eH58wNgc:1r38Dq:nthUxxys0kDY3MJ6Ahu_2tivnBvK5J10MPwOgumr768', '2023-11-29 05:13:54.424958');
