import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
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

  // texto del buscador
  const [busqueda, setBusqueda] = useState('');

  // pestaña activa (solo aplica en móvil; en desktop se ven las dos columnas)
  const [tab, setTab] = useState('lista');

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

  // filtra por nombre, apellido, correo o ciudad
  const entradasFiltradas = useMemo(() => {

    const q = busqueda.trim().toLowerCase();

    if (!q) return entradas;

    return entradas.filter(({ nombres, apellidos, correo, ciudad }) =>
      `${nombres} ${apellidos} ${correo} ${ciudad}`.toLowerCase().includes(q)
    );

  }, [entradas, busqueda]);

  // al tocar "Editar": carga los datos en el formulario y salta a esa pestaña
  const handleEditar = (contacto) => {

    const { id, ...datos } = contacto;

    setEntrada(datos);
    setModoEdicionId(id);
    setTab('form');

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  // limpia el formulario y sale del modo edición (botón Cancelar, o tras guardar)
  const handleCancelarEdicion = () => {
    setEntrada(ENTRADA_VACIA);
    setModoEdicionId(null);
  };

  // tras guardar con éxito: limpia y vuelve a la lista
  const handleGuardado = () => {
    handleCancelarEdicion();
    setTab('lista');
  };

  return (

    <Fragment>

      <Navbar brand='Libreta de contactos' />

      <div className="main-container">

        {/* Pestañas: solo se ven en móvil (en desktop hay espacio para las 2 columnas) */}
        <div className="tabs-movil" role="tablist">

          <button
            className={`tab-boton ${tab === 'lista' ? 'activo' : ''}`}
            onClick={() => setTab('lista')}
            role="tab"
            aria-selected={tab === 'lista'}
          >
            Contactos <span className="tab-badge">{entradas.length}</span>
          </button>

          <button
            className={`tab-boton ${tab === 'form' ? 'activo' : ''}`}
            onClick={() => setTab('form')}
            role="tab"
            aria-selected={tab === 'form'}
          >
            {modoEdicionId ? 'Editando' : 'Agregar'}
          </button>

        </div>

        <div className="row g-4">

          <div className={`col-lg-8 ${tab === 'lista' ? '' : 'tab-oculto'}`}>

            <div className="card-custom">

              <h2 className="section-title d-none d-lg-block">
                Contactos
              </h2>

              <input
                type="search"
                className="form-control buscador"
                placeholder="Buscar por nombre, correo o ciudad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                data-testid="input-buscar"
              />

              <Tabla
                entradas={entradasFiltradas}
                setListUpdated={setListUpdated}
                onEditar={handleEditar}
              />

            </div>

          </div>

          <div className={`col-lg-4 ${tab === 'form' ? '' : 'tab-oculto'}`}>

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
                onGuardado={handleGuardado}
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
