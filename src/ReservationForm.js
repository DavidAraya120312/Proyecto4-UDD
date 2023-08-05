import React, { useState } from 'react';

const ReservationForm = () => {
    const [data, setData] = useState({
        nombres: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/reservation');
            if (response.ok) {
                const data = await response.json();
                setReservations(data);
            } else {
                throw new Error('Error al obtener las reservas');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);  // Iniciar el spinner

        try {
            const response = await fetch('http://localhost:5001/api/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {  
                setIsLoading(false);  // Detener el spinner
                const result = await response.json();
                setMessage(result.message);  
                setErrorMessage(null);  
            } else {
                throw new Error('Error al guardar la reserva');
            }
        } catch (error) {
            console.error(error);
            setMessage(null); 
            setErrorMessage(error.message); 
        }
    }

    const deleteAllReservations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/reservation', {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Error al eliminar las reservas');
            }
            
            setReservations([]); // Limpiar las reservas del estado
            setMessage("Todas las reservas eliminadas.");
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }
    

    return (
        <form action="" className="formulario" onSubmit={handleSubmit}>
            <h1 className="formulario__titulo">Haz una reserva</h1>
            
            <input 
                type="text" 
                className="formulario__input" 
                name="nombres" 
                value={data.nombres} 
                onChange={handleChange}
                placeholder="Introduce tus nombres"  // Placeholder añadido
            />
            <label className="formulario__label">Nombres</label>

            <input 
                type="email" 
                className="formulario__input" 
                name="correo" 
                value={data.correo} 
                onChange={handleChange}
                placeholder="Introduce tu correo electrónico"  // Placeholder añadido
            />
            <label className="formulario__label">Correo</label>

            <input 
                type="text" 
                className="formulario__input" 
                name="telefono" 
                value={data.telefono} 
                onChange={handleChange}
                placeholder="Introduce tu número de teléfono"  // Placeholder añadido
            />
            <label className="formulario__label">Teléfono</label>

            <textarea 
                className="formulario__input" 
                name="mensaje" 
                value={data.mensaje} 
                onChange={handleChange}
                placeholder="Introduce un mensaje adicional"  // Placeholder añadido
            />
            <label className="formulario__label">Mensaje</label>

            {isLoading && <div className="spinner"></div>}
            <input type="submit" className="formulario__submit" />

            {message && <div className="success-message">{message}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button onClick={fetchReservations}>Mostrar Reservas</button>
            <div>

            <button onClick={deleteAllReservations}>Eliminar Todas las Reservas</button>


            {reservations.map((res, index) => (
            <div key={index}>
                <p><strong>Nombre:</strong> {res.nombres}</p>
                <p><strong>Correo:</strong> {res.correo}</p>
                <p><strong>Teléfono:</strong> {res.telefono}</p>
                <p><strong>Mensaje:</strong> {res.mensaje}</p>
                <hr />
            </div>
        ))}
    </div>

        </form>
    );
}

export default ReservationForm;
