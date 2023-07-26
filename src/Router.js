import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ProductosPage from './pages/ProductosPage'
import Producto from './pages/Producto'
import CategoriasSection from './pages/CategoriasSection'
import CategoriaPage from './pages/CategoriaPage'
import SobreNosotros from './pages/SobreNosotros'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';

const Router = () => {

    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [productores, setProductores] = useState([]);

    useEffect(() => {
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

        const fetchMarcas = async () => {
            try {
                const db = getFirestore();
                const marcasCol = collection(db, 'marcas');
                const snapshot = await getDocs(marcasCol);
                const marcasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMarcas(marcasData);
            } catch (error) {
                console.error('Error al cargar las marcas:', error);
            }
        };

        const fetchProductores = async () => {
            try {
                const db = getFirestore();
                const productoresCol = collection(db, 'productores');
                const snapshot = await getDocs(productoresCol);
                const productoresData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductores(productoresData);
            } catch (error) {
                console.error('Error al cargar los productores:', error);
            }
        };

        fetchProductos();
        fetchMarcas();
        fetchProductores();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productores" element={<CategoriasSection isMarcas={false} />} />
            <Route path="/marcas" element={<CategoriasSection isMarcas={true} />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            {productos.map(producto => (
                <Route
                    key={producto.id} // Asegúrate de tener una propiedad 'id' única para cada producto en Firestore
                    path={`/${producto.nombre.toLowerCase().trim().replaceAll(" ", "-")}`}
                    element={<Producto nombre={producto.nombre} imagen={producto.imagen} precio={producto.precio} descripcion={producto.descripcion} pack={producto.pack} estrellas={producto.estrellas} />}
                />
            ))}
            {marcas.map(marca => (
                <Route
                    key={marca.id}
                    path={`/marca/${marca.nombre.toLowerCase().trim().replaceAll(' ', '-')}`} // Cambiar la ruta como desees
                    element={<CategoriaPage key={marca.uid}
                        titulo={marca.nombre}
                        uid={marca.id}
                        descripcion={marca.descripcion} />}
                />
            ))}
            {productores.map(productor => (
                <Route
                    key={productor.id}
                    path={`/productor/${productor.nombre.toLowerCase().trim().replaceAll(' ', '-')}`} // Cambiar la ruta como desees
                    element={<CategoriaPage key={productor.uid}
                        titulo={productor.nombre}
                        uid={productor.id}
                        descripcion={productor.descripcion} />}
                />
            ))}
        </Routes>
    )
}

export default Router