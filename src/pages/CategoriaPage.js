import React, { useState, useEffect } from 'react';
import './CategoriaPage.css';
import Productos from '../components/Productos';
import { getMarcaProductos } from '../modelos/ProductoModel';

const CategoriaSection = (props) => {
    const { titulo, descripcion, id } = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getMarcaProductos(id).then((productos) => {
            setProductos(productos);
        });

    }, []);

    return (
        <div className="categorias-section">
            <div className="categoria-page-container">
                <h2 className="categoria-page-titulo">{titulo}</h2>
                <div dangerouslySetInnerHTML={{ __html: descripcion }} className='categoria-page-descripcion' />
                <Productos productos={productos} width="100%" grid="repeat(4, 1fr)" />
            </div>
        </div>
    );
}

export default CategoriaSection;