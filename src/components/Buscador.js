import React, { useState, useEffect } from 'react';
import './Buscador.css';
import { getFirestore, collection, query, where, getDocs, limit, orderBy, startAt, endAt } from 'firebase/firestore';

const Buscador = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const showResults = searchResults.length > 0;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const db = getFirestore();
        const productosCol = collection(db, 'productos');
        const productoresCol = collection(db, 'productores');
        const marcasCol = collection(db, 'marcas');

        // Convertimos la palabra ingresada a minúsculas para asegurarnos de que coincida correctamente
        const searchValueLower = searchValue.toLowerCase();

        // Realizamos las tres consultas en paralelo utilizando Promise.all
        const [productosSnapshot, productoresSnapshot, marcasSnapshot] = await Promise.all([
          getDocs(query(productosCol, where('etiquetas', 'array-contains', searchValueLower))),
          getDocs(query(productoresCol, where('etiquetas', 'array-contains', searchValueLower))),
          getDocs(query(marcasCol, where('etiquetas', 'array-contains', searchValueLower)))
        ]);

        // Obtenemos los resultados de cada consulta
        const productosResults = productosSnapshot.docs.map(doc => ({ ...doc.data(), tipo: 'Producto' }));
        const productoresResults = productoresSnapshot.docs.map(doc => ({ ...doc.data(), tipo: 'Productor' }));
        const marcasResults = marcasSnapshot.docs.map(doc => ({ ...doc.data(), tipo: 'Marca' }));

        // Combinamos todos los resultados en una sola lista
        const allResults = [...productosResults, ...productoresResults, ...marcasResults];

        if (allResults.length > 0) {
          setSearchResults(allResults);
          setIsDefaultSearch(false);
        } else {
          // Si no se encuentran resultados, mostramos el mensaje de búsqueda por defecto
          setIsDefaultSearch(true);
        }
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };

    if (searchValue !== '') {
      fetchSearchResults();
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