import React, { useState, useEffect } from 'react';
import Card from './Card';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Productos = (props) => {
    const { titulo } = props;
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
        <div className="productos">
            <h3 className="title-productos">{titulo}</h3>
            <div className="grid-products">
                {productos.map((producto, index) => (
                    <Card
                        key={index}
                        name={producto.nombre}
                        image={producto.imagen}
                        price={producto.precio}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos;
