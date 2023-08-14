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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigoPostal != e.target.cp.value && isValidCodigoPostal(e.target.cp.value) && envio) {
      alert("El código postal no coincide con el introducido anteriormente");
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

  // Función para crear la sesión de pago y redireccionar al usuario a la pasarela de pago de Stripe
  const handleBuyNow = async (id) => {
    try {
      // Hacer una solicitud POST al backend para crear una sesión de pago con Stripe
      const response = await axios.post(
        'https://api.primepellet.es/create-checkout-session', // Especifica la URL completa del backend
        {
          amount: (envio ? precioFinal : precioPack.toFixed(2)) * 100,
          currency: 'eur',
          nombre: nombre,
          productImage: "https://primepellet.es" + imagen.replaceAll("..", "").replaceAll("//", "/"),
          userId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true, // Importante: incluir este atributo para enviar cookies
        }
      );

      // Obtener el ID de la sesión de pago desde la respuesta del backend
      const sessionId = response.data.id;

      // Redireccionar al usuario a la pasarela de pago de Stripe
      const stripe = window.Stripe('pk_live_51NY3CrIhiBCy1girKTmEw5gbob5qkerzsfG2Q5VjOFMRNND3UiWbPEbFtmyy6L17jb775TROh0ncc9A4x53HXzu000AjdmXMGm'); // Reemplaza 'TU_STRIPE_PUBLIC_KEY' con tu clave pública de Stripe
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Error al redireccionar a la pasarela de pago:', error);
        // Puedes mostrar un mensaje de error o tomar otra acción en caso de que haya un error al redireccionar a la pasarela de pago
      }
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