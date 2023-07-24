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
    </>
  )
}

export default Home