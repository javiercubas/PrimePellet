import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Popup from './components/Popup';
import Cookies from 'universal-cookie';
import Footer from './components/Footer';
import Router from './Router';

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