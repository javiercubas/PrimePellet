import React, { useState, useEffect } from 'react';
import './Buscador.css';
import { buscar } from '../modelos/ProductoModel';

const Buscador = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const showResults = searchResults.length > 0;

  useEffect(() => {
    if (searchValue.length > 0) {
      buscar(searchValue).then((results) => {
        setSearchResults(results);
        setIsDefaultSearch(false);
      });
    } else {
      setSearchResults([]);
      setIsDefaultSearch(true);
    }
  }, [searchValue]);

  return (
    <div className={`box-buscador${isDefaultSearch ? ' no-results' : ''}`}>
      <div className='imagen-buscador' />
      <h2 className='titulo-buscador'>
        Encuentra <span>todas</span> las marcas de pellet con un <span>click</span>
      </h2>
      <input
        className={`input-buscador${showResults ? ' show-results' : ''}`}
        type='text'
        autoComplete='true'
        placeholder='Introduce tu búsqueda...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className={`search-results${showResults ? ' show-results' : ''}`}>
        {isDefaultSearch ? (
          <p>No se encontraron resultados. Escribe la palabra completa.</p>
        ) : (
          searchResults.map((result, index) => (
            <a
              href={result.modelInstance ? (result.type === 'Marca' ? result.type.toLowerCase() : result.type === 'Productor' ? result.type.toLowerCase() : '') + '/' + result.modelInstance.nombre.toLowerCase().trim().replaceAll(' ', '-') : '#'}
              key={index}
              className='search-result-item'
            >
              <img src={result.modelInstance.imagen} alt={result.modelInstance.nombre} />
              <div className='search-content-right'>
                <p>{result.modelInstance.nombre}</p>
                <p className='search-type'>{result.type}</p>
              </div>
            </a>
          ))          
        )}
      </div>
    </div>
  );
};

export default Buscador;