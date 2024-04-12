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
        title: 'Registrar Usuario',
        image: registrar,
        url: "create",
        text: 'Registra a nuevos usuarios en el sistema. '
    },
    {
        id: 2,
        title: 'Consultar Usuario',
        image: leer,
        url: "read",
        text: 'Consulta a todos los usuarios en el sistema.'
    },
    {
        id: 3,
        title: 'Actualizar Usuario',
        image: actualizar,
        url: "update",
        text: 'Actualiza a algun usuario en el sistema.'
    },
    {
        id: 4,
        title: 'Eliminar Usuario',
        image: eliminar,
        url: "delete",
        text: 'Elimina a algun usuario en el sistema.'
    }
]

function UsersCards(){

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

export default UsersCards;