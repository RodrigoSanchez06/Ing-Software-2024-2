import Card from '../Option/Card';
import '../Home/Cards.css';
import usuario from '../../assets/usuario.jpg'
import pelicula from '../../assets/peliculas.png'
import renta from '../../assets/rentar.png'

const cards = [
    {
        id: 1,
        title: 'Usuarios',
        image: usuario,
        url: "/users",
        text: 'Administra a los usuarios de ClonBuster'
    },
    {
        id: 2,
        title: 'Peliculas',
        image: pelicula,
        url: "/movies",
        text: 'Administra las peliculas disponibles en ClonBuster'
    },
    {
        id: 1,
        title: 'Rentas',
        image: renta,
        url: "/rents",
        text: 'Administra todas las rentas de ClonBuster'
    }
]

function Cards(){
    return (
        <div className='container d-flex justify-content-center h-100 align-items-center'>
            <div className='row'>
                {
                    cards.map(card => (
                        <div className='col-md-4' key ={card.id}>
                            <Card title={card.title} imageSource = {card.image} url = {card.url} text = {card.text}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cards;