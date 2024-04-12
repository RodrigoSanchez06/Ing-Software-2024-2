import '../../../Styles/Create.css';
import {userExist} from'../../../../functions/UsersFunctions'
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



function UpdateUser(){
    const formRef = useRef(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const  idUser  = parseInt(e.target.idUser.value);
        if (userExist(idUser)) {
            navigate(`/users/${idUser}`);
        } else {
            Swal.fire({
                title: '¡Érror!',
                text: 'El usuario no existe.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Actualizar Usuario</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>ID Usuario</label>
                        <input type="number" placeholder='ID' className='form-control' name='idUser' required />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UpdateUser;
