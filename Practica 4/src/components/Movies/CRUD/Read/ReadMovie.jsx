import movies from "../../../../data/DataMovies";
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
  text: {
    primary: '#E7E7E7',
    secondary: '#2aa198',
  },
  background: {
    default: '#575757',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#9B9B9B',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');


const columns = [

    {
        name : "Id Pelicula",
        selector: row => row.movieId
    },
    {
        name : "Titulo",
        selector:  row => row.title,
        sortable: true
    },
    {
        name : "Genero",
        selector:  row => row.genre
    },
    {    
        name : "Duracion",
        selector:  row => row.duration
    },
    {    
        name : "Stock",
        selector:  row => row.stock
    }
]



function ReadMovie(){
    return(
        <div className="container mt-5">
            <DataTable
                columns={columns}
                data={movies}
                theme="solarized"
            />
        </div>
    )
}

export default ReadMovie;