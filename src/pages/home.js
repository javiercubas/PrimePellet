import React, { useState, useEffect } from 'react';
import '../components/Menu.css';
import Buscador from '../components/Buscador';
import Productos from '../components/Productos';
import { getOfertas } from '../modelos/ProductoModel';

const Home = () => {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    getOfertas().then((productos) => {
      setProductosOferta(productos);
    });
  }, []);

  return (
    <>
      <Buscador />
      <Productos titulo="Ofertas" productos={productosOferta} />
    </>
  )
}

export default Home