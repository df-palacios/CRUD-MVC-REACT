import express from 'express';
import userRoutes from '../routes/usuario'
import authRoutes from '../routes/auth'
import cors from 'cors'
import db from '../db/connection';

class Server{

    private app:express.Application;
    private port:string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        //definir las rutas
        this.routes();
    }

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
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto '+this.port)
        })
    }

}

export default Server;