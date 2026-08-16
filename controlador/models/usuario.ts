import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario',{
    nombres:{
        type: DataTypes.STRING
    },
    apellidos:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    telefonos:{
        type: DataTypes.INTEGER
    },
    celular:{
        type: DataTypes.INTEGER
    },
    direccion:{
        type: DataTypes.STRING
    },
    ciudad:{
        type: DataTypes.STRING
    },
}, {
    tableName: 'usuarios'
})

export default Usuario;