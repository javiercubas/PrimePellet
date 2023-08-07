import React, { useState, useEffect } from 'react';
import './CategoriasSection.css';
import CategoriaSection from './CategoriaSection';
import { getMarcas } from '../modelos/MarcaModel';
import { getProductores } from '../modelos/ProductorModel';
import { getPartners } from '../modelos/PartnerModel';

const Categoria = (props) => {

  const { isMarcas, isPartners } = props;
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    if (isMarcas) {
      getMarcas().then((marcas) => {
        setMarcas(marcas);
      });
    }
    else if (!isPartners) {
      getProductores().then((productores) => {
        setMarcas(productores);
      });
    }
    else {
      getPartners().then((partners) => {
        setMarcas(partners);
      }
      );
    }
  }, []);

  return (
    <div className="categorias-section">
      {marcas.map(marca => (
        <CategoriaSection
          id={marca.id}
          isMarca={isMarcas}
          isPartner={isPartners}
          titulo={marca.nombre}
          descripcion={marca.descripcion}
          imagen={marca.imagen}
          url={marca.url}
        />
      ))}
    </div>
  );
}

export default Categoria;
