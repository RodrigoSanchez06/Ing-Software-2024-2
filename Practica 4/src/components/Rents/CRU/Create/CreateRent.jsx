import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import {create} from '../../../../functions/RentsFunctions'

function CreateRent(){

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userId, movieId, rentalDate, rentalDays } = e.target.elements;
        const status = e.target.elements.status.checked;
        console.log("¿Está entregada la renta? " + status);
        const created = create(userId.value, movieId.value, rentalDate.value, rentalDays.value, status);
        if (created) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'La Renta ha sido registrada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Limpiar los campos del formulario
                formRef.current.reset();
            });
        }
    };

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Registrar Renta</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>ID Usuario</label>
                        <input type="number" placeholder='Ej. 4' className='form-control' name='userId' required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >ID Pelicula</label>
                        <input type="number" placeholder='Ej. 7' className='form-control ' name='movieId' required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="fechaRenta" className='label-enter'>Rent Date</label>
                        <input type="date" id="fechaRenta" name="rentalDate" className='form-control'required/>
                    </div>

                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Dias de Renta</label>
                        <input type="number" placeholder='Ej. 5' className='form-control' name='rentalDays' required/>
                    </div>
                    <div>
                        <label htmlFor="check">Entregado</label> 
                        <Form.Check // prettier-ignore
                        type="switch"
                        id="status"
                        />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateRent;