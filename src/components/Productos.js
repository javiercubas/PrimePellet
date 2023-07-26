import React, { useState, useEffect } from 'react';
import Card from './Card';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Productos = (props) => {
    const { titulo, productos, width, grid } = props;

    return (
        <div className="productos" style={{ width: width }}>
            {titulo ? <h3 className="title-productos">{titulo}</h3> : null}
            <div className="grid-products" style={{ gridTemplateColumns: grid}}>
                {productos.map((producto, index) => (
                    <Card
                        key={index}
                        name={producto.nombre}
                        image={producto.imagen}
                        price={producto.precio}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos;