import React from 'react'
import './CompraExitosa.css'

const CompraExitosa = () => {
  return (
    <div className="exitosa-container">
        <h2 className="exitosa-title">Compra realizada con éxito</h2>
        <p className="exitosa-text">En breve recibirá un correo electrónico con los detalles de su compra.</p>
        <p className="exitosa-text">Gracias por confiar en Prime Pellet.</p>
        <a href="/" className="exitosa-button">Volver a la página de inicio</a>
    </div>
  )
}

export default CompraExitosa