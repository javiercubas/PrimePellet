import React, { useState, useEffect } from 'react';
import './Buscador.css';
import { buscarProductos } from '../modelos/ProductoModel';
import { buscarMarcas } from '../modelos/MarcaModel';
import { buscarProductores } from '../modelos/ProductorModel';

const Buscador = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const showResults = searchResults.length > 0;

  const buscarTodos = async (searchValue) => {
    const [productos, marcas, productores] = await Promise.all([
      buscarProductos(searchValue),
      buscarMarcas(searchValue),
      buscarProductores(searchValue),
    ]);

    return [...productos, ...marcas, ...productores];
  };

  useEffect(() => {
    buscarTodos(searchValue).then((results) => {
      if (results.length > 0) {
        setSearchResults(results);
        setIsDefaultSearch(false);
      }
    });
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