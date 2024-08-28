import React from 'react';
import { Link } from 'react-router-dom';

export const Inicio = () => {
  return (
    <div className='jumbo'>

      <h1>Bienvenido al blog con React</h1>
      <p>Blog desarrollador con el MERN Stack (Mongo, Express, React, Node)</p>

      <Link to="/articulos" className='button'>Ver los articulos</Link>

    </div>
  )
}
