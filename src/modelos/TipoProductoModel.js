import ProductoModel from './ProductoModel.js';

class TipoProductoModel {
    constructor({ id, nombre, url }) {
        this.id = id;
        this.nombre = nombre;
        this.url = url;
    }
}

// Función para consultar todos los tipos de productos de la api
export const getTiposProductos = async () => {
    const response = await fetch('https://api.primepellet.es/tipos-productos?bbdd=1');
    const tiposProductos = await response.json();
    return tiposProductos.map((tipoProducto) => new TipoProductoModel(tipoProducto));
};

// Función para consultar todos los productos de un tipo de producto de la api
export const getTipoProductoProductos = async (id) => {
    const response = await fetch(`https://api.primepellet.es/productos?bbdd=1&tipo_producto=${id}`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

export default TipoProductoModel;