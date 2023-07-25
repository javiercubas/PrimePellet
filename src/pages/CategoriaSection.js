import React, { useState, useEffect } from 'react';
import './CategoriaSection.css';
import Productos from '../components/Productos';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const CategoriaSection = (props) => {
    const { titulo, descripcion, uid, isMarca } = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Carga los datos de Firestore cuando el componente se monte
        const fetchProductos = async () => {
            try {
                const db = getFirestore();
                const marcasDocRef = doc(db, 'marcas', uid);
                const marcasDocSnapshot = await getDoc(marcasDocRef);

                if (marcasDocSnapshot.exists()) {
                    const productosRefs = marcasDocSnapshot.data().productos || [];
                    const productosData = [];

                    // Obtener los productos referenciados
                    for (const productoRef of productosRefs) {
                        const productoDocSnapshot = await getDoc(productoRef);
                        if (productoDocSnapshot.exists()) {
                            productosData.push(productoDocSnapshot.data());
                        }
                    }

                    // Limitar a 4 productos
                    const productosLimitados = productosData.slice(0, 4);

                    setProductos(productosLimitados);
                } else {
                    console.log('El documento de marcas no existe.');
                }
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
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