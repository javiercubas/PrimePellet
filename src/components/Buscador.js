import React, { useState, useEffect } from 'react';
import './Buscador.css';

const Buscador = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const showResults = searchResults.length > 0;

  useEffect(async () => {
    const response = await fetch(`https://93.93.118.169/buscar?search=${searchValue}`);
    const productos = await response.json();
    setSearchResults(productos);
    setIsDefaultSearch(searchValue.length < 1);

    if (searchValue.length < 1) {
      setSearchResults([]);
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
            <a href={result ? (result.tipo == 'Marca' ? result.tipo.toLowerCase() : result.tipo == 'Productor' ? result.tipo.toLowerCase() : '') + '/' + result.nombre.toLowerCase().trim().replaceAll(' ', '-') : '#'} key={index} className='search-result-item'>
              <img src={result.imagen} alt={result.nombre} />
              <div className='search-content-right'>
                <p>{result.nombre}</p>
                <p className='search-type'>{result.tipo}</p> {/* Agregamos el tipo de resultado */}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default Buscador;