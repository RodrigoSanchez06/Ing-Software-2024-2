import movies from '../data/DataMovies'

function generateUniqueId() {
    if (movies.length === 0) {
        return 1;
    }
    const maxId = movies.reduce((max, movie) => {
        return movie.movieId > max ? movie.movieId : max;
    }, 0);
    return maxId + 1;
}

export function movieExist(movieId){
    return movies.find(movie => movie.movieId === movieId);
}

export function create(title, genre, duration, stock) {
    // Validar los datos
    if (!title || !genre || !duration || !stock) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    if (duration <= 0 || stock < 0){
        alert('El stock y la duracion deben ser numero enteros positivos.');
        return false;
    }
    const movieId = generateUniqueId();

    movies.push({
        movieId: movieId,
        title: title,
        genre: genre,
        duration: duration,
        stock: stock
    });
    
    return true;
}


export function update(movieId, title, genre, duration, stock){
    if (!title || !genre || !duration || !stock) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    if (duration <= 0 || stock < 0){
        alert('El stock y la duracion deben ser numero enteros positivos.');
        return false;
    }
    const movie = movieExist(movieId);
    if(movieExist(movieId)){
        const index = movies.indexOf(movie);
        const newMovie = {
            movieId : movieId,
            title : title,
            genre : genre,
            duration : duration,
            stock : stock
        };
        movies[index] = newMovie;
        return true;
    } else {
        return false;
    }
}

//No delete porque al parecer es una palabra reservada
export function deleteMovie(movieId) {
    // Encuentra el índice de la película con el ID proporcionado
    const index = movies.findIndex(movie => movie.movieId === movieId);
    
    // Si se encuentra la película
    if (index !== -1) {
        // Elimina la película del array de películas
        movies.splice(index, 1);
        return true; // Devuelve verdadero para indicar que la película fue eliminada con éxito
    }
    
    return false; // Devuelve falso si la película no se encontró
}


