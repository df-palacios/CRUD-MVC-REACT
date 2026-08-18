import express from 'express';
import userRoutes from '../routes/usuario'
import authRoutes from '../routes/auth'
import testingRoutes from '../routes/testing'
import cors from 'cors'
import db from '../db/connection';

// Envuelve la app de Express: arma middlewares, rutas y conexión a la BD
// en el constructor, y expone listen() para arrancar el servidor HTTP.
class Server{

    private app:express.Application;
    private port:string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        testing: '/api/testing'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8001';
        this.dbConnection();
        this.middlewares();
        //definir las rutas
        this.routes();
    }

    // Solo verifica que las credenciales/host sean correctos (authenticate
    // no crea conexiones persistentes ni tablas); si falla, se registra el
    // error pero el servidor sigue levantando igual.
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
        this.app.use(this.apiPaths.auth,authRoutes)
        this.app.use(this.apiPaths.testing,testingRoutes)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto '+this.port)
        })
    }

}

export default Server;