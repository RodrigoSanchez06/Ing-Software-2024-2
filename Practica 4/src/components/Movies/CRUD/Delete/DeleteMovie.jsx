import React, { useRef } from 'react';
import { deleteMovie } from '../../../../functions/MoviesFunctions';
import Swal from 'sweetalert2';

function DeleteMovie(){

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        const { movieId } = e.target.elements;
        let succes =deleteMovie(parseInt(movieId.value))
        if(succes){
            Swal.fire({
                title: '¡Éxito!',
                text: 'La película ha sido eliminada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'La película no se ha encontrado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Eliminar Pelicula</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>ID pelicula</label>
                        <input type="number" placeholder='ID' className='form-control' name='movieId' required />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteMovie;