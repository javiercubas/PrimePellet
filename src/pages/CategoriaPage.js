import React, { useState, useEffect } from 'react';
import './CategoriaPage.css';
import Productos from '../components/Productos';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const CategoriaSection = (props) => {
    const { titulo, descripcion, uid } = props;
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

                        // Comprobar si el documento existe antes de acceder a sus datos
                        if (productoDocSnapshot.exists()) {
                            productosData.push(productoDocSnapshot.data());
                        }
                    }

                    setProductos(productosData);
                } else {
                    console.log('El documento de marcas no existe.');
                }
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, [uid]);

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