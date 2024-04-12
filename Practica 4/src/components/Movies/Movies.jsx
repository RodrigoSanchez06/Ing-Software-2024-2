
import MoviesCards from "./MoviesCards";
import '../Home/Cards.css';


function Movies(){
    return (
        <>
        <div className='text-light'>
        <h1 className = 'titulo'>Peliculas</h1>
        <MoviesCards />
        </div>
        <div>
        </div>
        </>
    )
}

export default Movies;