import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Popup.css';
import { FaTimes } from 'react-icons/fa';
import './FinalizaTuCompra.css'
import axios from 'axios';
import { addCliente } from '../modelos/ClienteModel';
import { set } from 'react-ga';
// Importamos las cookies
const cookies = new Cookies();

const Popup = (props) => {
  const { nombre, imagen, precio, envio, onClose } = props;

  const formRef = useRef();

  // Recuperamos el codigo postal de las cookies
  const [codigoPostal, setCodigoPostal] = useState(cookies.get('codigoPostal'));

  // Función para comprobar si un valor es un número entero
  const isInteger = (value) => {
    return /^\d+$/.test(value);
  };

  const isValidCodigoPostal = (codigoPostal) => {
    if (!isInteger(codigoPostal)) {
      return false;
    }

    const parsedCodigoPostal = parseInt(codigoPostal, 10);
    return parsedCodigoPostal >= 1000 && parsedCodigoPostal <= 50999;
  };
  const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{9}$/; // Ejemplo de validación de 9 dígitos numéricos
    return phonePattern.test(phone);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigoPostal != e.target.cp.value && isValidCodigoPostal(e.target.cp.value) && envio) {
      alert("El código postal no coincide con el introducido anteriormente");
    }
    else if (!isValidPhone(e.target.telefono.value)) {
      alert("El teléfono introducido no es válido");
    }
    else {
      addCliente({
        nombre: e.target.nombre.value,
        apellidos: e.target.apellidos.value,
        correo: e.target.email.value,
        telefono: e.target.telefono.value,
        direccion: e.target.direccion.value,
        codigoPostal: e.target.cp.value,
        provincia: e.target.provincia.value,
        localidad: e.target.localidad.value,
        dni: e.target.dni.value,
        producto: nombre,
        precio: (precio),
        pagado: false,
        envio: envio,
      })
        .then((clienteId) => {
          handleBuyNow(e, clienteId);
        })
    }
  };

  const closePopup = () => {
    onClose();
  };

  // Función para crear la sesión de pago con BBVA
  const handleBuyNow = async (event, id) => {
    try {
      event.preventDefault();

      try {
        const response = await axios.post('https://api.primepellet.es/create-payment', {
          amount: precio.toFixed(4) * 100,
          order: id,
          terminal: '001',
          url: 'https://primepellet.es/notificacion',
          urlOK: 'https://primepellet.es/compra-exitosa',
          urlKO: 'https://primepellet.es/compra-fallida',
        });

        const { params, signature } = response.data;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://sis.redsys.es/sis/realizarPago';
        form.appendChild(createHiddenInput('Ds_SignatureVersion', 'HMAC_SHA256_V1'));
        form.appendChild(createHiddenInput('Ds_MerchantParameters', params));
        form.appendChild(createHiddenInput('Ds_Signature', signature));
        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error('Payment failed:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createHiddenInput = (name, value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
  };


  return (
    <div id="popup-container" className="popup-container">
      <div className="popup-background"></div>
      <div className="finaliza-content">
        <FaTimes className="finaliza-close-icon" onClick={closePopup} />
        <h2 className='finaliza-title'>Finaliza tu compra</h2>
        <form ref={formRef} className='finaliza-form' onSubmit={handleSubmit}>
          <div className='finaliza-wrap'>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Nombre</p>
              <input className='finaliza-input' type="text" name="nombre" placeholder="Nombre" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Apellidos</p>
              <input className='finaliza-input' type="text" name="apellidos" placeholder="Apellidos" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Email</p>
              <input className='finaliza-input' type="email" name="email" placeholder="Email" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Teléfono</p>
              <input className='finaliza-input' type="tel" name="telefono" placeholder="Teléfono" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Dirección</p>
              <input className='finaliza-input' type="text" name="direccion" placeholder="Dirección" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Código postal</p>
              <input className='finaliza-input' type="text" name="cp" placeholder="Código postal" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Provincia</p>
              <input className='finaliza-input' type="text" name="provincia" placeholder="Provincia" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Localidad</p>
              <input className='finaliza-input' type="text" name="localidad" placeholder="Localidad" required />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>DNI</p>
              <input className='finaliza-input' type="text" name="dni" placeholder="DNI" required />
            </div>
          </div>
          <button className='finaliza-button' type="submit">CONTINUAR</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;