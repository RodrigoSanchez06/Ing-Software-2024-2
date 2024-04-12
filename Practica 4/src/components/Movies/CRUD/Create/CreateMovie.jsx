import '../../../Styles/Create.css';
import {create} from'../../../../functions/MoviesFunctions'
import Swal from 'sweetalert2';
import React, { useRef } from 'react';

function CreateMovie() {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, genre, duration, stock } = e.target.elements;
        const created = create(title.value, genre.value, parseInt(duration.value), parseInt(stock.value));
        if (created) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'La película ha sido registrada correctamente.',
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
                    <h3 className='title'>Crear Pelicula</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Titulo</label>
                        <input type="text" placeholder='Titulo' className='form-control' name='title' />
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >Genero</label>
                        <input type="text" placeholder='Genero' className='form-control ' name='genre' />
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>Duracion</label>
                        <input type="number" placeholder='Duracion (min)' className='form-control' name='duration' />
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>Stock</label>
                        <input type="number" placeholder='Stock' className='form-control' name='stock' />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateMovie;