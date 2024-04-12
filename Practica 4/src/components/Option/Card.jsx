import './Card.css'
import { NavLink } from "react-router-dom";

function Card({ title, imageSource, url, text, onSelect }) {
    const handleCardClick = () => {
      if (onSelect) {
        onSelect();
      }
    };
  
    return (
      <div className="card text-center bg-dark card-tam" >
        <img src={imageSource} alt="miImagen" />
        <div className="card-body text-light">
          <h4 className="card-title">{title}</h4>
          <p className="card-text text-secondary">{text}</p>
          <NavLink to={url} className="btn btn-outline-secondary rounded-0" onClick={handleCardClick}>
            Administrar
          </NavLink>
        </div>
      </div>
    );
  }

export default Card;