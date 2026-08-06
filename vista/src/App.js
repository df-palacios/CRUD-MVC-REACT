import React, { Fragment, useState, useEffect, useCallback } from 'react';
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

  // lista de contactos
  const [entradas, setEntradas] = useState([]);

  // actualizar tabla
  const [listUpdated, setListUpdated] = useState(false);

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
                  entrada={entrada}
                  entradas={entradas}
                  setListUpdated={setListUpdated}
                />

              </div>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="card-custom">

              <h2 className="section-title">
                Agregar contacto
              </h2>

              <Form
                entrada={entrada}
                setEntrada={setEntrada}
                setListUpdated={setListUpdated}
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
