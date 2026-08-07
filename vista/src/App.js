import React, { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Tabla from './Components/Tabla';
import Form from './Components/Form';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { getUsuarios } from './services/api';
import './App.css';

const ENTRADA_VACIA = {
  nombres: '',
  apellidos: '',
  correo: '',
  telefonos: 0,
  celular: 0,
  direccion: '',
  ciudad: ''
};

const Contactos = () => {

  // estado del formulario
  const [entrada, setEntrada] = useState(ENTRADA_VACIA);

  // id del contacto que se está editando (null = modo "crear")
  const [modoEdicionId, setModoEdicionId] = useState(null);

  // lista de contactos
  const [entradas, setEntradas] = useState([]);

  // actualizar tabla
  const [listUpdated, setListUpdated] = useState(false);

  const formRef = useRef(null);

  const cargarEntradas = useCallback(async () => {

    const { ok, data } = await getUsuarios();

    if (ok) {
      setEntradas(data.data);
    } else {
      console.log(data?.msg);
    }

  }, []);

  // obtener contactos
  useEffect(() => {
    cargarEntradas();
    setListUpdated(false);
  }, [listUpdated, cargarEntradas]);

  // al tocar "Editar" en una fila/tarjeta: carga esos datos en el formulario
  // y lleva la vista hasta él (clave en móvil, donde el form queda abajo)
  const handleEditar = (contacto) => {

    const { id, ...datos } = contacto;

    setEntrada(datos);
    setModoEdicionId(id);

    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  };

  // limpia el formulario y sale del modo edición (botón Cancelar, o tras guardar)
  const handleCancelarEdicion = () => {
    setEntrada(ENTRADA_VACIA);
    setModoEdicionId(null);
  };

  return (

    <Fragment>

      <Navbar brand='Libreta de contactos' />

      <div className="main-container">

        <div className="row g-4">

          <div className="col-lg-8">

            <div className="card-custom">

              <h2 className="section-title">
                Contactos
              </h2>

              <div className="table-responsive">

                <Tabla
                  entradas={entradas}
                  setListUpdated={setListUpdated}
                  onEditar={handleEditar}
                />

              </div>

            </div>

          </div>

          <div className="col-lg-4" ref={formRef}>

            <div className={`card-custom ${modoEdicionId ? 'card-custom-editando' : ''}`}>

              <h2 className="section-title">
                {modoEdicionId ? 'Editar contacto' : 'Agregar contacto'}
              </h2>

              <Form
                entrada={entrada}
                setEntrada={setEntrada}
                setListUpdated={setListUpdated}
                modoEdicionId={modoEdicionId}
                onCancelar={handleCancelarEdicion}
              />

            </div>

          </div>

        </div>

      </div>

    </Fragment>

  );

};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Contactos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
