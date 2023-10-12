import React, { useState, useEffect } from 'react';
import '../components/Menu.css';
import Buscador from '../components/Buscador';
import Productos from '../components/Productos';
import { getOfertas } from '../modelos/ProductoModel';
import PromoPopUp from '../components/PromoPopUp';
import ThermoRossiSVG from '../components/thermorossi'

const Home = () => {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    getOfertas().then((productos) => {
      setProductosOferta(productos);
    });
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <>
      <Buscador />
      <Productos titulo="Ofertas" productos={productosOferta} />
      <div className="sponsors-content" onClick={handleShowPopup}>
        <ThermoRossiSVG />
      </div>
      {showPopup && <PromoPopUp onClose={() => {
        setShowPopup(false);
        document.body.style.overflow = 'unset';
      }} type={1} />}
    </>
  )
}

export default Home