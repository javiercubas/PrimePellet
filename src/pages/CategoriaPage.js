import React, { useState, useEffect } from 'react';
import './CategoriaPage.css';
import Productos from '../components/Productos';
import { getMarcaProductos } from '../modelos/ProductoModel';
import { getProductorProductos } from '../modelos/ProductoModel';
import { getTipoProductoProductos } from '../modelos/TipoProductoModel';
import PromoPopUp from '../components/PromoPopUp';
import ThermoRossiCalderas from '../components/thermorossiCalderas';
import ThermoRossiEstufas from '../components/thermorossiEstufas';

const CategoriaSection = (props) => {
    const { titulo, descripcion, id, isMarca, isProductor, type } = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (isMarca) {
            getMarcaProductos(id).then((productos) => {
                setProductos(productos);
            });
        }
        else if (isProductor) {
            getProductorProductos(id).then((productos) => {
                setProductos(productos);
            });
        }
        else {
            getTipoProductoProductos(id).then((productos) => {
                setProductos(productos);
            });
        }
    }, []);

    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
    }

    return (
        <div className="categorias-section">
            <div className="categoria-page-container">
                <h2 className="categoria-page-titulo">{titulo}</h2>
                <div dangerouslySetInnerHTML={{ __html: descripcion }} className='categoria-page-descripcion' />
                <Productos productos={productos} width="100%" grid="repeat(4, 1fr)" />
            </div>
            <div className="sponsors-content" onClick={handleShowPopup}>
                {type === 3 ? <ThermoRossiEstufas /> : <ThermoRossiCalderas />}
            </div>
            {showPopup && <PromoPopUp onClose={() => {
                setShowPopup(false);
                document.body.style.overflow = 'unset';
            }} type={type} />}
        </div>
    );
}

export default CategoriaSection;