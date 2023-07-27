import React from 'react'
import Productos from '../components/Productos';
import { useState, useEffect } from 'react';
import { getProductos } from '../modelos/ProductoModel';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    // Cargo los productos con la funcion getProductos
    useState(() => {
        getProductos().then((productos) => {
            setProductos(productos);
        });
    }, []);    
        
    return (
        <div style={{ margin: '10vh 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Productos titulo="Productos" productos={productos} />
        </div>
    )
}

export default ProductosPage