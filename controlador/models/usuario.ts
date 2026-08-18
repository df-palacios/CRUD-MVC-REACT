import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Modelo Sequelize para la tabla de contactos ("Usuario" es el nombre del
// modelo dentro del código; el nombre real de la tabla en MySQL es
// "usuarios", ver tableName más abajo). Sin tableName explícito, Sequelize
// pluraliza/capitaliza el nombre del modelo y busca "Usuarios", que no
// existe — así se rompía antes de fijar esto acá.
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
    tableName: 'usuarios' // nombre real de la tabla en la base de datos
})

export default Usuario;