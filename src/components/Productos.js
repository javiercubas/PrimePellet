import React from 'react'
import Card from './Card'

const Productos = (props) => {
    const { titulo } = props;
    return (
        <div className="productos">
            <h3 className="title-productos">{titulo}</h3>
            <div className="grid-products">
                <Card name="PELLET ASTURIAS PACK 72 uds" image="/assets/asturias-pack.jpg" price="5,45" />
                <Card name="PELLET ASTURIAS" image="/assets/asturias.jpg" price="5,85" />
                <Card name="NATUR PELLET PACK 70 uds" image="/assets/naturpellet-pack.jpg" price="6,05" />
                <Card name="NATUR PELLET" image="/assets/naturpellet.jpg" price="6,15" />
                <Card name="WOODPELLET PACK 70 uds" image="/assets/woodpellet-pack.jpg" price="6,75" />
                <Card name="WOODPELLET" image="/assets/woodpellet.jpg" price="6,85" />
                <Card name="HUESO ACEITUNA PACK 70 uds" image="/assets/hueso-aceituna-pack.jpg" price="4,75" />
                <Card name="HUESO ACEITUNA" image="/assets/hueso-aceituna.jpg" price="4,85" />
            </div>
        </div>
    )
}

export default Productos