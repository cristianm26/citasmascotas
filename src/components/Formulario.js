import React, { useState } from 'react'
import { v1 as uuid } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {
    //Crear el State de Citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
    const [error, setError] = useState(false);
    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = (e) => {

        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //extraer lso valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = (e) => {
        e.preventDefault();
        // Validar 
        if (mascota.trim() === '' || propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === '') {
            setError(true)
            return
        }

        //Eliminar el mensaje previo
        setError(false)

        //Asignar un Id
        cita.id = uuid();
        //Crear la cita
        crearCita(cita)
        //Reiniciar el formulario
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return (
        <>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                : null}
            <form onSubmit={submitCita} >
                <label>Nombre Mascota</label>
                <input type="text" name="mascota" className="u-full-width" placeholder="Nombre Mascota" onChange={actualizarState} value={mascota} />
                <label>Nombre Dueño</label>
                <input type="text" name="propietario" className="u-full-width" placeholder="Nombre del Dueño de la mascota" onChange={actualizarState} value={propietario} />
                <label> Fecha</label>
                <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />
                <label>Hora</label>
                <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />
                <label>Sintomas </label>
                <textarea name="sintomas" className="u-full-width" onChange={actualizarState} value={sintomas} >

                </textarea>
                <button type="submit" className="u-full-width button-primary ">
                    Agregar Cita
                </button>
            </form>
        </>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}


export default Formulario
