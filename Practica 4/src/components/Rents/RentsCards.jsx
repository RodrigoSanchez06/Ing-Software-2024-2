import Card from '../Option/Card'
import '../Home/Cards.css'
import actualizar from '../../assets/actualizar.png'
import leer from '../../assets/buscar.png'
import registrar from '../../assets/peliculas.png'
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';


const cards = [
    {
        id: 1,
        title: 'Registrar Renta',
        image: registrar,
        url: "create",
        text: 'Registra una nueva renta en el sistema. '
    },
    {
        id: 2,
        title: 'Consultar Renta',
        image: leer,
        url: "read",
        text: 'Consulta todas las rentas registradas en el sistema.'
    },
    {
        id: 3,
        title: 'Actualizar Renta',
        image: actualizar,
        url: "update",
        text: 'Actualiza alguna de nuestras rentas registradas en el sistema.'
    },
]

function RentsCards(){

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
            <div className="col-md-4" key={card.id}>
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

export default RentsCards;