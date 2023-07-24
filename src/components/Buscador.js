import React, { useState, useEffect } from 'react';
import './Buscador.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Buscador = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const db = getFirestore();
        const productosCol = collection(db, 'productos');
        const q = query(productosCol, where('nombre', '>=', searchValue.toLowerCase()));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => doc.data());
        setSearchResults(results);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };

    fetchSearchResults();
  }, [searchValue]);

  return (
    <div className='box-buscador'>
      <div className='imagen-buscador' />
      <h2 className='titulo-buscador'>
        Encuentra <span>todas</span> las marcas de pellet con un <span>click</span>
      </h2>
      <input
        className='input-buscador'
        type='text'
        autoComplete='true'
        placeholder='Introduce tu búsqueda...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div className='search-results'>
          {searchResults.map((result) => (
            <a href={result.nombre.toLowerCase().trim().replaceAll(' ', '-')} key={result.id} className='search-result-item'>
              <img src={result.imagen} alt={result.nombre} />
              <p>{result.nombre}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buscador;