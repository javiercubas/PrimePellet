import React from 'react'
import Productos from '../components/Productos';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Carga los datos de Firestore cuando el componente se monte
        const fetchProductos = async () => {
            try {
                const db = getFirestore();
                const productosCol = collection(db, 'productos');
                const snapshot = await getDocs(productosCol);
                const productosData = snapshot.docs.map(doc => doc.data());
                setProductos(productosData);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, []);
    return (
        <div style={{ margin: '10vh 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Productos titulo="Productos" productos={productos} />
        </div>
    )
}

export default ProductosPage