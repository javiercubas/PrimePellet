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
import CategoriaPage from './pages/CategoriaPage';
import Footer from './components/Footer';
import SobreNosotros from './pages/SobreNosotros';
import Router from './Router';

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

  const cookies = new Cookies();
  const location = useLocation(); // Si estás utilizando React Router

  const tieneCodigoPostal = cookies.get('codigoPostal');

  // Verifica si el popup debe mostrarse)
  const mostrarPopup = !tieneCodigoPostal

  return (
    <>
      {mostrarPopup && <Popup />}
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;