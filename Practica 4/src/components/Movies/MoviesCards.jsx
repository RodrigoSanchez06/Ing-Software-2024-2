import Card from '../Option/Card'
import '../Home/Cards.css'
import actualizar from '../../assets/actualizar.png'
import leer from '../../assets/buscar.png'
import eliminar from '../../assets/eliminar.png'
import registrar from '../../assets/peliculas.png'
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';

const cards = [
    {
        id: 1,
        title: 'Registrar Pelicula',
        image: registrar,
        url: "create",
        text: 'Registra nuevas peliculas en el sistema '
    },
    {
        id: 2,
        title: 'Consultar Peliculas',
        image: leer,
        url: "read",
        text: 'Consulta todas las peliculas disponibles'
    },
    {
        id: 3,
        title: 'Actualizar Pelicula',
        image: actualizar,
        url: "update",
        text: 'Actualiza alguna pelicula de nuestro catalogo'
    },
    {
        id: 4,
        title: 'Eliminar Pelicula',
        image: eliminar,
        url: "delete",
        text: 'Elimina alguna pelicula de nuestro catalogo'
    }
]

function MoviesCards(){

    const [showContent, setShowContent] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowContent(false);
    };


    
    
  const renderContent = () => {
    if (!showContent) {
      return <Outlet />;
    }

    return (
      <div className="container d-flex justify-content-center h-100 align-items-center">
        <div className="row">
          {cards.map((card) => (
            <div className="col-md-3" key={card.id}>
              <Card
                title={card.title}
                imageSource={card.image}
                url={card.url}
                text={card.text}
                onSelect={() => handleOptionSelect(card)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );


   
}

export default MoviesCards;