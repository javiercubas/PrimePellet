import React from 'react'
import './Card.css'

const Card = (props) => {
  const { image, name, price, url, iva } = props;
  return (
    <a href={url} className="card-box">
      <div className="foto-card" style={{ backgroundImage: `url(${image})` }} />
      <div className="inside-box">
        <h3 className="title-card">{name}</h3>
        <div className="precio-card">{price} €{iva == 1? ' + IVA' : '/ud (IVA INCLUIDO)'}</div>
      </div>
      <button className="cta-card">COMPRA AHORA</button>
    </a>
  )
}

export default Card