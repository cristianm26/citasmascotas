import React, { useEffect, useState } from 'react'
import Cita from './components/Cita'
import Formulario from './components/Formulario'

const App = () => {

  //citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = []
  }



  //Arreglo de Citas
  const [citas, setCitas] = useState(citasIniciales)
  //useEffect para realizar ciertas operaciones cuando el State cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas])
  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    setCitas([
      ...citas, cita
    ])
  }

  //Funcion que elimina una cita por ese id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas)
  }
  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No Hay Citas' : 'Administra tus citas'
  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row" >
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
