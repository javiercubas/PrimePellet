import React, { useState, useEffect } from 'react';
import './CategoriasSection.css';
import CategoriaSection from './CategoriaSection';
import { getMarcas } from '../modelos/MarcaModel';
import { getProductores } from '../modelos/ProductorModel';
import { getPartners } from '../modelos/PartnerModel';
import PromoPopUp from '../components/PromoPopUp'
import ThermoRossiSVG from '../components/thermorossi'

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

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <>
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
      <div className="sponsors-content" onClick={handleShowPopup}>
        <ThermoRossiSVG />
      </div>
      {
        showPopup && <PromoPopUp onClose={() => {
          setShowPopup(false);
          document.body.style.overflow = 'unset';
        }} type={1} />
      }
    </>
  );
}
export default Categoria;
