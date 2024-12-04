import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landing-main'>
    <h1>Página de destino</h1>
    <p>¡Hola, y bienvenido!</p>
    <Link to="/login" className="landing-login-button">Ingresar</Link>
    <Link to="/register" className="landing-register-button">Register</Link>
  </div>
  )
}

export default Landing