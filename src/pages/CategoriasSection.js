import React, { useState, useEffect } from 'react';
import './CategoriasSection.css';
import CategoriaSection from './CategoriaSection';
import { getMarcas } from '../modelos/MarcaModel';

const Categoria = (props) => {

  const { isMarcas } = props;
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    getMarcas().then((marcas) => {
      setMarcas(marcas);
    });

  }, []);

  return (
    <div className="categorias-section">
      {marcas.map(marca => (
        <CategoriaSection
          id={marca.id}
          isMarca={isMarcas}
          titulo={marca.nombre}
          descripcion={marca.descripcion}
        />
      ))}
    </div>
  );
}

export default Categoria;
