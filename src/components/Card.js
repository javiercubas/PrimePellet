import React from 'react'
import './Card.css'

const Card = (props) => {
  const { image, name, price } = props;
  return (
    <a href='/' className="card-box">
      <div className="foto-card" style={{ backgroundImage: `url(${image})` }} />
      <div className="inside-box">
        <h3 className="title-card">{name}</h3>
        <div className="precio-card">{price} €/ud (IVA INCLUIDO)</div>
      </div>
      <button className="cta-card">+ INFO</button>
    </a>
  )
}

export default Card