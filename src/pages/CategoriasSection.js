import React, { useState, useEffect } from 'react';
import './CategoriasSection.css';
import CategoriaSection from './CategoriaSection';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Categoria = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    // Cargar las marcas cuando el componente se monte
    const fetchMarcas = async () => {
      try {
        const db = getFirestore();
        const marcasCol = collection(db, 'marcas');
        const snapshot = await getDocs(marcasCol);
        const marcasData = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        setMarcas(marcasData);
      } catch (error) {
        console.error('Error al cargar las marcas:', error);
      }
    };

    fetchMarcas();
  }, []);

  return (
    <div className="categorias-section">
      {marcas.map(marca => (
        <CategoriaSection
          key={marca.uid}
          titulo={marca.nombre}
          uid={marca.uid}
          descripcion={marca.descripcion}
        />
      ))}
    </div>
  );
}

export default Categoria;
