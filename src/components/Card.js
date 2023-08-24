import React from 'react'
import './Card.css'

const Card = (props) => {
  const { image, name, price, url, pack, iva } = props;

  // Limitar el título a 75 caracteres y agregar "..." si es más largo
  const limitedTitle = name.length > 75 ? name.substring(0, 72) + '...' : name;

  return (
    <a href={url} className="card-box">
      <div className="foto-card" style={{ backgroundImage: `url(${image})` }} />
      <div className="inside-box">
        <h3 className="title-card">{limitedTitle}</h3>
        <div className="precio-card">{price} €{pack==1? '' : '/ud' + iva == 1? ' + IVA' : ' (IVA INCLUIDO)'}</div>
      </div>
      <button className="cta-card">COMPRA AHORA</button>
    </a>
  )
}

export default Card