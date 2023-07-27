import React, { useState, useEffect } from 'react';
import './CategoriaSection.css';
import Productos from '../components/Productos';
import { getMarcaProductos } from '../modelos/ProductoModel';

const CategoriaSection = (props) => {
    const { id, isMarca, titulo, descripcion } = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getMarcaProductos(id, 4).then((productos) => {
            setProductos(productos);
        });

    }, []);

    return (
        <div className="categoria-container">
            <h2 className="categoria-titulo">{titulo}</h2>
            <div className="categoria-content">
                <div className={`categoria-left ${window.innerWidth <= 768 ? 'mobile-view' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: descripcion }} className='categoria-descripcion' />
                    {window.innerWidth >= 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
                </div>
                <Productos productos={productos} width="60%" grid="repeat(2, 1fr)" />
                {window.innerWidth < 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
            </div>
        </div>
    );
}

export default CategoriaSection;