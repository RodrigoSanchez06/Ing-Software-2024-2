import {useParams} from 'react-router-dom'
import {rentExist, update } from '../../../../functions/RentsFunctions'
import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';

export default function UpdateRentForm() {
    const formRef = useRef(null);

    const params = useParams()
    const id = parseInt(params.idRent)

    const rent = rentExist(id)

    const handleSubmit = (e) => {
        e.preventDefault()
        let succes =update(id, e.target.userId.value, e.target.movieId.value, e.target.rentalDate.value, e.target.rentalDays.value, e.target.status.value)
        if(succes){
            Swal.fire({
                title: '¡Éxito!',
                text: 'La renta ha sido actualizada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Registrar Renta</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>ID Usuario</label>
                        <input type="number" className='form-control' name='userId' defaultValue={rent.userId} required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >ID Pelicula</label>
                        <input type="number" className='form-control ' name='movieId' defaultValue={rent.movieId} required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="fechaRenta" className='label-enter'>Rent Date</label>
                        <input type="date" id="fechaRenta" name="rentalDate" className='form-control' defaultValue={rent.rentalDate}required/>
                    </div>

                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Dias de Renta</label>
                        <input type="number" className='form-control' name='rentalDays' defaultValue={rent.rentalDays} required/>
                    </div>
                    <div>
                        <label htmlFor="check">Entregado</label> 
                        <Form.Check // prettier-ignore
                        type="switch"
                        id="status"
                        defaultChecked={rent.status}
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