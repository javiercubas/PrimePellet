import React, { useState, useEffect } from 'react';
import './CategoriaSection.css';
import Productos from '../components/Productos';
import { getMarcaProductos } from '../modelos/ProductoModel';
import { getProductorProductos } from '../modelos/ProductoModel';

const CategoriaSection = (props) => {
    const { id, isMarca, isPartner, titulo, descripcion, imagen, url } = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (isMarca) {
            getMarcaProductos(id, 4).then((productos) => {
                setProductos(productos);
            });
        }
        else if (!isPartner) {
            getProductorProductos(id, 4).then((productos) => {
                setProductos(productos);
            });
        }
    }, []);

    return (
        isPartner && url != null ?
            <a href={url} className="categoria-container">
                <h2 className="categoria-titulo">{titulo}</h2>
                {isPartner && <img src={imagen} className="categoria-imagen" />}
                <div className="categoria-content">
                    <div className={`categoria-left ${window.innerWidth <= 768 ? 'mobile-view' : ''}`} style={{ width: isPartner ? '100%' : '35%' }}>
                        <div dangerouslySetInnerHTML={{ __html: descripcion }} className='categoria-descripcion' />
                        {!isPartner && window.innerWidth >= 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
                    </div>
                    {!isPartner && <Productos productos={productos} width="60%" grid="repeat(2, 1fr)" />}
                    {!isPartner && window.innerWidth < 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
                </div>
            </a>
            :
            <div className="categoria-container">
                <h2 className="categoria-titulo">{titulo}</h2>
                {isPartner && <img src={imagen} className="categoria-imagen" />}
                <div className="categoria-content">
                    <div className={`categoria-left ${window.innerWidth <= 768 ? 'mobile-view' : ''}`} style={{ width: isPartner ? '100%' : '35%' }}>
                        <div dangerouslySetInnerHTML={{ __html: descripcion }} className='categoria-descripcion' />
                        {!isPartner && window.innerWidth >= 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
                    </div>
                    {!isPartner && <Productos productos={productos} width="60%" grid="repeat(2, 1fr)" />}
                    {!isPartner && window.innerWidth < 768 && <a href={(isMarca ? '/marca/' : '/productor/') + titulo.toLowerCase().trim().replaceAll(' ', '-')} className="categoria-button">Más información</a>}
                </div>
            </div>
    );
}

export default CategoriaSection;