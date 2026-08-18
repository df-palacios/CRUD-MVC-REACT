import { Sequelize } from 'sequelize';

// Instancia única de Sequelize para toda la app (se importa desde acá en
// models/usuario.ts y en cualquier controller que necesite hacer queries
// crudas, como controllers/testing.ts).
// Los defaults (localhost/root/'') son solo para que el proyecto levante
// sin .env en una primera instalación local; en cualquier entorno real
// SIEMPRE se espera que las variables DB_* vengan definidas.
const db = new Sequelize(
    process.env.DB_NAME || 'libreta',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false // la tabla usuarios no tiene createdAt/updatedAt
        },
        logging: false, // sin esto, Sequelize imprime cada SQL generado en consola
    }
)

export default db;