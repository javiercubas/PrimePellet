import React, { useState, useEffect } from 'react';
import './CategoriasSection.css';
import CategoriaSection from './CategoriaSection';
import { getMarcas } from '../modelos/MarcaModel';
import { getProductores } from '../modelos/ProductorModel';

const Categoria = (props) => {

  const { isMarcas } = props;
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    if(isMarcas){
      getMarcas().then((marcas) => {
        setMarcas(marcas);
      });
    }
    else{
      getProductores().then((productores) => {
        setMarcas(productores);
      });
    }
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
