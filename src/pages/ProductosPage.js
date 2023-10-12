import React from 'react'
import Productos from '../components/Productos';
import { useState, useEffect } from 'react';
import { getProductos } from '../modelos/ProductoModel';
import PromoPopUp from '../components/PromoPopUp';
import ThermoRossiSVG from '../components/thermorossi'

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    // Cargo los productos con la funcion getProductos
    useState(() => {
        getProductos().then((productos) => {
            setProductos(productos);
        });
    }, []);

    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <div style={{ margin: '10vh 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Productos titulo="Productos" productos={productos} />
            </div>
            <div className="sponsors-content" onClick={handleShowPopup}>
                <ThermoRossiSVG />
            </div>
            {
                showPopup && <PromoPopUp onClose={() => {
                    setShowPopup(false);
                    document.body.style.overflow = 'unset';
                }} type={1} />
            }
        </>
    )
}

export default ProductosPage