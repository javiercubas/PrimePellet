import React from 'react';
import './Buscador.css'

const Buscador = () => {
  return (
    <div className='box-buscador'>
    <div className='imagen-buscador'/>
    <h2 className='titulo-buscador'>Encuentra <span>todas</span> las marcas de pellet con un <span>click</span></h2>
      <input className='input-buscador' type='text' autoComplete='true' placeholder='Introduce tu búsqueda...' />
    </div>
  );
}

export default Buscador;
