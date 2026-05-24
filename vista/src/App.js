import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Tabla from './Components/Tabla';
import Form from './Components/Form';
import './App.css';

function App() {

  // estado del formulario
  const [entrada, setEntrada] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefonos: 0,
    celular: 0,
    direccion: '',
    ciudad: ''
  });

  // lista de contactos
  const [entradas, setEntradas] = useState([]);

  // actualizar tabla
  const [listUpdated, setListUpdated] = useState(false);

  // obtener contactos
  useEffect(() => {

    const getEntradas = async () => {

      try {

        const response = await fetch('http://localhost:8000/api/usuarios');

        const result = await response.json();

        if (response.ok) {

          setEntradas(result.data);

        } else {

          console.log(result.msg);

        }

      } catch (error) {

        console.log('Error al obtener usuarios:', error);

      }

    };

    getEntradas();

    setListUpdated(false);

  }, [listUpdated]);

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
              />

            </div>

          </div>

        </div>

      </div>

    </Fragment>

  );

}

export default App;