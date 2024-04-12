import {useParams} from 'react-router-dom'
import {userExist, update } from '../../../../functions/UsersFunctions'
import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';

export default function UpdateUserForm() {
    const formRef = useRef(null);

    const params = useParams()
    const id = parseInt(params.idUser)

    const user = userExist(id)

    const handleSubmit = (e) => {
        e.preventDefault()
        let succes =update(id, e.target.name.value, e.target.lastName.value, e.target.middleName.value, e.target.password.value, e.target.email.value, e.target.superUser.value)
        if(succes){
            Swal.fire({
                title: '¡Éxito!',
                text: 'El usuario ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
        <div className='rounded bg-white contain'>
            <form onSubmit={handleSubmit} ref={formRef}>
                <h3 className='title'>Actualizar Usuario </h3>
                <div className='mb-2 enter-text'>
                    <label htmlFor="text" className='label-enter'>Nombre</label>
                    <input type="text"  className='form-control' name='name' defaultValue={user.name}required/>
                </div>
                <div className='mb-2 enter-text'>
                    <label htmlFor="text" className='label-enter' >Apellido Paterno</label>
                    <input type="text"  className='form-control ' name='lastName' defaultValue={user.lastName} required/>
                </div>
                <div className='mb-2 enter-text'>
                    <label htmlFor="text" className='label-enter' >Apellido Materno</label>
                    <input type="text"  className='form-control ' name='middleName' defaultValue={user.middleName} />
                </div>
                <div className='mb-2 enter-text'>
                    <label htmlFor="text" className='label-enter'>Contraseña</label>
                    <input type="password"  className='form-control' name='password' required defaultValue={user.password}/>
                </div>
                <div className='mb-2 enter-text'>
                    <label htmlFor="text" className='label-enter'>email</label>
                    <input type="text" className='form-control' name='email' defaultValue={user.email}/>
                </div>
                <div>
                    <label htmlFor="check">Super usuario</label> 
                    <Form.Check // prettier-ignore
                    type="switch"
                    id="superUser"
                    defaultChecked={user.superUser}
                    />
                </div>
                <div className='d-grid '>
                    <button className='btn btn-secondary button-create'>Actualizar</button>
                </div>
            </form>
        </div>
    </div>
    );
}