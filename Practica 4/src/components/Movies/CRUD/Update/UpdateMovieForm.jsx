import {useParams} from 'react-router-dom'
import { movieExist, update } from '../../../../functions/MoviesFunctions'
import React, { useRef } from 'react';
import Swal from 'sweetalert2';

export default function UpdateMovieForm() {
    const formRef = useRef(null);

    const params = useParams()
    const id = parseInt(params.movieId)

    const movie = movieExist(id)

    const handleSubmit = (e) => {
        e.preventDefault()
        let succes =update(id, e.target.title.value, e.target.genre.value, e.target.duration.value, e.target.stock.value)
        if(succes){
            Swal.fire({
                title: '¡Éxito!',
                text: 'La película ha sido registrada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Actualizar Pelicula</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter'>Titulo</label>
                        <input type="text"  className='form-control' name='title' defaultValue={movie.title} required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="text" className='label-enter' >Genero</label>
                        <input type="text"  className='form-control ' name='genre' defaultValue={movie.genre} required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>Duracion</label>
                        <input type="number"  className='form-control' name='duration' defaultValue={movie.duration} required/>
                    </div>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>Stock</label>
                        <input type="number"  className='form-control' name='stock' defaultValue={movie.stock} required/>
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}