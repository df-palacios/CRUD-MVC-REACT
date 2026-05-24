"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
// GET - obtener todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll();
        return res.status(200).json({
            ok: true,
            data: usuarios
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios'
        });
    }
});
exports.getUsuarios = getUsuarios;
// GET - obtener un usuario por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        return res.status(200).json({
            ok: true,
            data: usuario
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar usuario'
        });
    }
});
exports.getUsuario = getUsuario;
// POST - crear usuario
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Validación básica
        if (!body.nombres ||
            !body.apellidos ||
            !body.correo) {
            return res.status(400).json({
                ok: false,
                msg: 'Faltan campos obligatorios'
            });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            data: usuario
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        });
    }
});
exports.postUsuario = postUsuario;
// PUT - actualizar usuario
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        yield usuario.update(body);
        return res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            data: usuario
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
});
exports.putUsuario = putUsuario;
// DELETE - eliminar usuario
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        yield usuario.destroy();
        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map