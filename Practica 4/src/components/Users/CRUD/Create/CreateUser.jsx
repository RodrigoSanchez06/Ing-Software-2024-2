import '../../../Styles/Create.css';
import {create} from'../../../../functions/UsersFunctions'
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';

function CreateUser() {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, lastName, middleName, password, email } = e.target.elements;
        const superUserChecked = e.target.elements.superUser.checked;
        console.log("¿Está activado el super usuario? " + superUserChecked);
        const created = create(name.value, lastName.value, middleName.value, password.value, email.value, superUserChecked);
        if (created) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'El usuario ha sido registrado correctamente.',
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
                    <h3 className='title'>Registrar Pelicula</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Nombre</label>
                        <input type="text" placeholder='Ej. Juan' className='form-control' name='name' required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >Apellido Paterno</label>
                        <input type="text" placeholder='Ej. Perez' className='form-control ' name='lastName' required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >Apellido Materno</label>
                        <input type="text" placeholder='Ej. Martinez' className='form-control ' name='middleName' />
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Contraseña</label>
                        <input type="password" placeholder='Contraseña' className='form-control' name='password' required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>email</label>
                        <input type="text" placeholder='ejemplo@mail.com' className='form-control' name='email' />
                    </div>
                    <div>
                        <label htmlFor="check">Super usuario</label> 
                        <Form.Check // prettier-ignore
                        type="switch"
                        id="superUser"
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

export default CreateUser;