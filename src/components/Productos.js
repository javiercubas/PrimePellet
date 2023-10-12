import Card from './Card';
import './Productos.css';
import { useState, useEffect } from 'react';

const Productos = (props) => {
    const { titulo, productos, width, grid, tipo } = props;

    // Obtenemos la fecha actual
    const fecha = new Date();
    const dia = fecha.getDate();
    // Mes escrito en texto
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    const fechaActual = `${dia} de ${mes} de ${anio}`;

    // Estado para controlar el estado de parpadeo
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        // Cambiar el estado de parpadeo cada segundo
        const interval = setInterval(() => {
            setBlink(prevBlink => !prevBlink);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <div className="productos" style={{ width: width }}>
            {titulo ? <h3 className="title-productos">{titulo}</h3> : null}
            <div className="descripcion-precios">
                <div className={`blink-dot ${blink ? 'green-blink' : ''}`} />
                <p className="price-productos">Precios actualizados a <span>{fechaActual}</span></p>
            </div>
            <div className="grid-products" style={{ gridTemplateColumns: grid }}>
                {productos.map((producto, index) => (
                    <Card
                        key={index}
                        name={producto.nombre}
                        image={producto.imagen}
                        price={producto.precio}
                        url={producto.url}
                        pack={producto.pack}
                        iva={producto.iva}
                    />
                ))}
            </div>
        </div>
    );
}

export default Productos;
