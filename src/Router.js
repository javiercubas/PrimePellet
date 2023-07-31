import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ProductosPage from './pages/ProductosPage'
import Producto from './pages/Producto'
import CategoriasSection from './pages/CategoriasSection'
import CategoriaPage from './pages/CategoriaPage'
import SobreNosotros from './pages/SobreNosotros'
import { useEffect, useState } from 'react';
import { getProductos } from './modelos/ProductoModel';
import { getProductores } from './modelos/ProductorModel';
import { getMarcas } from './modelos/MarcaModel';
import CompraExitosa from './pages/CompraExitosa'
import SitemapViewer from './pages/SitemapViewer'

const Router = () => {

    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [productores, setProductores] = useState([]);

    useEffect(() => {
        getProductos().then((productos) => {
            setProductos(productos);
        });

        getMarcas().then((marcas) => {
            setMarcas(marcas);
        });

        getProductores().then((productores) => {
            setProductores(productores);
        });

    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productores" element={<CategoriasSection isMarcas={false} />} />
            <Route path="/marcas" element={<CategoriasSection isMarcas={true} />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
            <Route path="/sitemap.xml" element={<SitemapViewer />} />
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