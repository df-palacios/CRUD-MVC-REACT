// Punto de entrada del backend.
// 'dotenv/config' se importa primero que todo para que las variables de
// .env (DB_*, JWT_SECRET, ADMIN_*) ya estén en process.env antes de que
// Server, la conexión a la BD o cualquier otro módulo las lean.
import 'dotenv/config';
import Server from './models/server';

const server = new Server();
server.listen();