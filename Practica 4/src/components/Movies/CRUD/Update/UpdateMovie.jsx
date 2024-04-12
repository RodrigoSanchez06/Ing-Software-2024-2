import '../../../Styles/Create.css';
import {movieExist} from'../../../../functions/MoviesFunctions'
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";

function UpdateMovie() {
    const formRef = useRef(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const  movieId  = parseInt(e.target.movieId.value);
        if (movieExist(movieId)) {
            navigate(`/movies/${movieId}`);
        } else {
            Swal.fire({
                title: '¡Érror!',
                text: 'La película no existe.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    };

    return (
        <div className='login template d-flex justify-content-center align-items-center container text-dark'>
            <div className='rounded bg-white contain'>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <h3 className='title'>Actualizar Pelicula</h3>
                    <div className='mb-2 enter-text'>
                        <label htmlFor="number" className='label-enter'>ID pelicula</label>
                        <input type="number" placeholder='ID' className='form-control' name='movieId' required />
                    </div>
                    <div className='d-grid '>
                        <button className='btn btn-secondary button-create'>Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateMovie;