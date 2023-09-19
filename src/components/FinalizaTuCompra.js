import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Popup.css';
import { FaTimes } from 'react-icons/fa';
import './FinalizaTuCompra.css'
import axios from 'axios';
import { addCliente } from '../modelos/ClienteModel';
// Importamos las cookies
const cookies = new Cookies();

const Popup = (props) => {
  const { nombre, imagen, precioPack, envio, precioFinal, onClose } = props;

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
        precio: (envio ? precioFinal : precioPack.toFixed(2)),
        pagado: false,
        envio: envio,
      })
        .then((clienteId) => {
          handleBuyNow(clienteId);
        })
    }
  };

  const closePopup = () => {
    onClose();
  };

  // Función para crear la sesión de pago con BBVA
  const handleBuyNow = async (id) => {
    try {
      // Hacer una solicitud POST al backend para crear una sesión de pago con BBVA
      const response = await axios.post(
        'http://localhost:80/create-checkout-session', // Especifica la URL completa del backend
        {
          amount: (envio ? precioFinal : precioPack.toFixed(2)) * 100,
          userId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Importante: incluir este atributo para enviar cookies
        }
      );

      // El backend manejará la redirección a la pasarela de pago de BBVA, no es necesario hacerlo aquí.
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
      // Puedes mostrar un mensaje de error o tomar otra acción en caso de que haya un error al crear la sesión de pago
    }
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