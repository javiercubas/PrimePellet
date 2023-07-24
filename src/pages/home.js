import React, { useState, useEffect } from 'react';
import '../components/Menu.css';
import Buscador from '../components/Buscador';
import Productos from '../components/Productos';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    const fetchProductosOferta = async () => {
      try {
        const db = getFirestore();

        // Obtener los documentos de la colección "ofertas"
        const ofertasCol = collection(db, 'ofertas');
        const snapshotOfertas = await getDocs(ofertasCol);

        // Array para almacenar los productos en oferta
        const productosOfertaData = [];

        // Iterar sobre los documentos de ofertas y obtener los productos
        for (const ofertaDoc of snapshotOfertas.docs) {
          // Obtener el documento del producto referenciado
          const productoRef = ofertaDoc.data().ref;

          // Validate if productoRef exists and is a valid DocumentReference
          if (productoRef) {
            const productoSnapshot = await getDoc(productoRef);

            // Si el documento del producto existe, agregarlo al array de productos en oferta
            if (productoSnapshot.exists()) {
              const productoData = productoSnapshot.data();
              productosOfertaData.push(productoData);
            } else {
              console.warn('Documento del producto no encontrado:', productoRef.id);
            }
          } else {
            console.warn('Referencia de producto no encontrada:', ofertaDoc.id);
          }
        }

        setProductosOferta(productosOfertaData);
      } catch (error) {
        console.error('Error al cargar los productos en oferta:', error);
      }
    };

    fetchProductosOferta();
  }, []);

  return (
    <>
      <Buscador />
      <Productos titulo="Ofertas" productos={productosOferta} />
      <div className="contact">
        <div className='left-content'>
          <h3 className="header-menu">CONTÁCTANOS</h3>
          <h4 className="content-menu">ATENCIÓN COMERCIAL: <a href="tel:+34623190390">623 190 390</a></h4>
          <a target="_blank" href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><h4 className="content-menu">CALLE REAL 1-A TORREJÓN DE LA CALZADA (29991) MADRID (junto a los desguaces)</h4></a>
        </div>
        <div className='rigth-content'>
          <a target="_blank" href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><div className="mapa"></div></a>
        </div>
      </div>
    </>
  )
}

export default Home