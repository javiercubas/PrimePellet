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

  // Configurar seguimiento de eventos personalizados si es necesario
  const trackEvent = (category, action, label, value) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
      value: value,
    });
  };

  // Enviar la página actual a Google Analytics cada vez que cambia la ubicación
  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);

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