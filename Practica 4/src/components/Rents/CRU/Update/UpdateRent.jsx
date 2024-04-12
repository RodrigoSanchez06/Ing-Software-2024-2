import '../../../Styles/Create.css';
import {rentExist} from'../../../../functions/RentsFunctions'
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



function UpdateRent(){

    const formRef = useRef(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const  idRent  = parseInt(e.target.idRent.value);
        if (rentExist(idRent)) {
            navigate(`/rents/${idRent}`);
        } else {
            Swal.fire({
                title: '¡Érror!',
                text: 'La Renta no existe.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Actualizar Renta</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>ID </label>
                        <input type="number" placeholder='ID' className='form-control' name='idRent' required />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateRent;