import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Producto from './pages/Producto';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/pellet-asturias-pack-72-uds" exact element={<Producto nombre="PELLET ASTURIAS PACK 72 uds" precio_ud="5,45" precio={392.4} pack={72} imagen="../../assets/asturias-pack.jpg" descripcion="<p>En esta página, encontrarás información detallada sobre el pellet de 15 kg Pellet Asturias, un producto de alta calidad para calentar tu hogar de manera eficiente. Conoce todas sus características y beneficios.</p>
                    <h3>Elaboración con madera natural de calidad</h3>
                    <p>El pellet de 15 kg Pellet Asturias está elaborado cuidadosamente utilizando madera natural de la más alta calidad. La materia prima proviene de subproductos como serrines, astillas y leñas descortezadas. Estos elementos son prensados a alta temperatura para crear los pellets, sin la necesidad de utilizar aditivos que puedan comprometer la calidad del producto final.</p>
                    <h3>Proceso de secado y tratamiento</h3>
                    <p>Después del prensado, los pellets se someten a un proceso de secado de banda a baja temperatura. Esto garantiza que la madera conserve su naturaleza y propiedades originales, evitando cualquier pérdida de calidad. El resultado es un pellet denso y con un contenido de humedad muy bajo, lo que contribuye a su eficiencia y rendimiento en estufas y calderas.</p>
                    <h3>Características técnicas</h3>
                    <ul>
                        <li><strong>Tipo de presentación:</strong> Pack</li>
                        <li><strong>Tipo de combustible:</strong> Pellets</li>
                        <li><strong>Origen:</strong> Nacional</li>
                    </ul>
                    <h3>Certificaciones y cumplimiento normativo</h3>
                    <p>Este pellet de 15 kg en Pellet Asturias cumple con todos los estándares técnicos y reglamentarios nacionales. Está respaldado por certificados que garantizan la calidad y la seguridad del producto.</p>
                    <h3>¡Disfruta de un hogar cálido y acogedor!</h3>
                    <p>No pierdas la oportunidad de asegurar el calor y el confort en tu hogar con estos pellets de calidad de Pellet Asturias.</p>
                    <p>Compra ahora y experimenta un ambiente agradable durante todo el invierno. No te arrepentirás de elegir el pellet de 15 kg de Pellet Asturias como tu opción de combustible eficiente y sostenible.</p>" />} />
      </Routes>

    </>
  );
}

export default App;