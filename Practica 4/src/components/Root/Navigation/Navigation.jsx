import './Navigation.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo.png';
import { NavLink } from "react-router-dom";



function Navigation() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink href="/">
            <img src={logo} alt="logo" className = 'logo'/>
          </NavLink>
          <Nav className="me-auto ">
            <NavLink to="/" className="links-bar">Inicio</NavLink>
            <NavLink to="users" className="links-bar">Usuarios</NavLink>
            <NavLink to="movies" className="links-bar">Peliculas</NavLink>
            <NavLink to="rents" className="links-bar">Rentas</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <div>
      
      </div>
    </>
  );
}

export default Navigation;

