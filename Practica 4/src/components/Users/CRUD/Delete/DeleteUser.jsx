
import React, { useRef } from 'react';
import { deleteUser } from '../../../../functions/UsersFunctions';
import Swal from 'sweetalert2';
 

function DeleteUser(){

    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const {idUser} = e.target.elements;
        let  succes  = deleteUser(parseInt(idUser.value));
        if(succes){
            Swal.fire({
                title: '¡Éxito!',
                text: 'El usuario ha sido eliminado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'El usuario no se  encontró.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
 
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Eliminar Uusuario</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>ID Usuario</label>
                        <input type="number" placeholder='ID' className='form-control' name='idUser' required />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteUser;
