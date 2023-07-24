import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Popup.css';
import { FaTimes } from 'react-icons/fa';

const Popup = () => {
  const [codigoVerificacion, setCodigoVerificacion] = useState(['', '', '', '', '']);
  const [codigoPostalValido, setCodigoPostalValido] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const cookies = new Cookies();
  const inputRefs = useRef([]);
  const formRef = useRef();

  const handleCodigoVerificacionChange = (e, index) => {
    const newCodigoVerificacion = [...codigoVerificacion];
    newCodigoVerificacion[index] = e.target.value;
    setCodigoVerificacion(newCodigoVerificacion);

    if (e.target.value.match(/^\d$/) && index < codigoVerificacion.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const codigoPostal = codigoVerificacion.join('');
    const codigoPostalValido = validarCodigoPostal(codigoPostal);
    setCodigoPostalValido(codigoPostalValido);

    console.log('Código postal:', codigoPostal);

    if (codigoPostalValido) {
      console.log('Código postal válido:', codigoPostal);
      cookies.set('codigoPostal', codigoPostal, { path: '/', maxAge: 86400 });
      closePopup();
    } else {
      setCodigoVerificacion(['', '', '', '', '']);
    }
  };

  const handleInputKeyDown = (e, index) => {
    if (e.key === 'Backspace' && codigoVerificacion[index] === '') {
      const prevIndex = Math.max(index - 1, 0);
      inputRefs.current[prevIndex].focus();
    }
  };

  const handleLastInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      formRef.current.submit();
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    cookies.set('popupClosed', true, { path: '/', maxAge: 86400 });
  };

  const validarCodigoPostal = (codigoPostal) => {
    return /^\d{5}$/.test(codigoPostal) && codigoPostal >= 1000 && codigoPostal <= 52999;
  };

  useEffect(() => {
    const popupClosed = cookies.get('popupClosed');
    if (popupClosed) {
      setIsPopupVisible(false);
    }
  }, []);

  if (!isPopupVisible) {
    return null; // Devuelve null para ocultar el componente si no es visible
  }

  return (
    <div id="popup-container" className="popup-container">
      <div className="popup-background"></div>
      <div className="popup-content">
        <FaTimes className="close-icon" onClick={closePopup} />
        <img src='../../assets/logo.png' alt='logo' className='logo-popup' />
        <h2>¡Bienvenido! <br></br> Ingresa tu código postal para obtener los <span>mejores precios.</span></h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="codigo-verificacion">
            {codigoVerificacion.map((codigo, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={codigo}
                onChange={(e) => handleCodigoVerificacionChange(e, index)}
                onKeyDown={(e) => handleInputKeyDown(e, index)}
                onKeyUp={index === codigoVerificacion.length - 1 ? handleLastInputKeyUp : undefined}
                maxLength="1"
                required
              />
            ))}
          </div>
          {!codigoPostalValido && (
            alert('Código postal no válido.')
          )}
          <button type="submit">ENCUENTRA PRECIOS BARATOS</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;