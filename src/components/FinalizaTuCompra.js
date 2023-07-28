import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Popup.css';
import { FaTimes } from 'react-icons/fa';
import './FinalizaTuCompra.css'
import axios from 'axios';
import { addCliente } from '../modelos/ClienteModel';

const Popup = (props) => {
  const { nombre, imagen, precioPack, envio, precioFinal } = props;

  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

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
    })
      .then((cliente) => {
        handleBuyNow(cliente.id);
      })
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  if (!isPopupVisible) {
    return null; // Devuelve null para ocultar el componente si no es visible
  }

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
      const stripe = window.Stripe('pk_test_51NY3CrIhiBCy1girW7wCZOD9ldfbNJnXu2yUXbMcfsrQT911aL8htoIzJodcdyw7GPp9M7e8hFALnnhqW56O0wX400YePDy6NV'); // Reemplaza 'TU_STRIPE_PUBLIC_KEY' con tu clave pública de Stripe
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
              <input className='finaliza-input' type="text" name="nombre" placeholder="Nombre" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Apellidos</p>
              <input className='finaliza-input' type="text" name="apellidos" placeholder="Apellidos" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Email</p>
              <input className='finaliza-input' type="email" name="email" placeholder="Email" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Teléfono</p>
              <input className='finaliza-input' type="tel" name="telefono" placeholder="Teléfono" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Dirección</p>
              <input className='finaliza-input' type="text" name="direccion" placeholder="Dirección" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Código postal</p>
              <input className='finaliza-input' type="text" name="cp" placeholder="Código postal" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Provincia</p>
              <input className='finaliza-input' type="text" name="provincia" placeholder="Provincia" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>Localidad</p>
              <input className='finaliza-input' type="text" name="localidad" placeholder="Localidad" />
            </div>
            <div className="finaliza-form-content">
              <p className='finaliza-text'>DNI</p>
              <input className='finaliza-input' type="text" name="dni" placeholder="DNI" />
            </div>
          </div>
          <button className='finaliza-button' type="submit">CONTINUAR</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;