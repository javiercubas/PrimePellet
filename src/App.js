import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Producto from './pages/Producto';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import ProductosPage from './pages/ProductosPage';
import Popup from './components/Popup';
import Cookies from 'universal-cookie';
import CategoriasSection from './pages/CategoriasSection';

const firebaseConfig = {
  apiKey: "AIzaSyApPtWeHbfGCexvNMUu1inpEfzLB1imwwA",
  authDomain: "primepellet-a77ae.firebaseapp.com",
  projectId: "primepellet-a77ae",
  storageBucket: "primepellet-a77ae.appspot.com",
  messagingSenderId: "801897344064",
  appId: "1:801897344064:web:f4eee5946d7dfcb68683a5",
  measurementId: "G-DRLBQTWJVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = getFirestore(app);
        const productosCol = collection(db, 'productos');
        const snapshot = await getDocs(productosCol);
        const productosData = snapshot.docs.map(doc => doc.data());
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const cookies = new Cookies();
  const location = useLocation(); // Si estás utilizando React Router

  const tieneCodigoPostal = cookies.get('codigoPostal');

  // Verifica si el popup debe mostrarse)
  const mostrarPopup = !tieneCodigoPostal

  return (
    <>
      {mostrarPopup && <Popup />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productores" element={<CategoriasSection />} />
        {productos.map(producto => (
          <Route
            key={producto.id} // Asegúrate de tener una propiedad 'id' única para cada producto en Firestore
            path={`/${producto.nombre.toLowerCase().trim().replaceAll(" ", "-")}`}
            element={<Producto nombre={producto.nombre} imagen={producto.imagen} precio={producto.precio} descripcion={producto.descripcion} pack={producto.pack} />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;