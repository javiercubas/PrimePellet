import MarcaModel from './MarcaModel';
import ProductorModel from './ProductorModel';

class ProductoModel {
    constructor({
        id,
        nombre,
        descripcion,
        precio,
        pack,
        imagen,
        estrellas,
        marca,
        productor,
        oferta,
        tipo,
        url,
        iva
    }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.pack = pack;
        this.imagen = imagen;
        this.estrellas = estrellas;
        this.marca = marca;
        this.productor = productor;
        this.oferta = oferta;
        this.url = url;
        this.tipo = tipo;
        this.iva = iva;
    }
}

// Función para consultar todos los productos de la api
export const getProductos = async () => {
    const response = await fetch('https://api.primepellet.es/productos?bbdd=1');
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para consultar 4 productos de la marca de la api
export const getMarcaProductos = async (id, limit) => {
    const response = await fetch(`https://api.primepellet.es/marcas/${id}/productos?limit=${limit}&bbdd=1`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para obtener n productos de un productor de la api
export const getProductorProductos = async (id, limit) => {
    const response = await fetch(`https://api.primepellet.es/productores/${id}/productos?limit=${limit}&bbdd=1`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para consultar un producto de la api
export const getProducto = async (id) => {
    const response = await fetch(`https://api.primepellet.es/productos/${id}?bbdd=1`);
    const producto = await response.json();
    return new ProductoModel(producto);
};

// Función para buscar productos de la api
export const buscarProductos = async (query) => {
    const response = await fetch(`https://api.primepellet.es/productos?search=${query}&bbdd=1`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para cargar ofertas de la api
export const getOfertas = async () => {
    const response = await fetch('https://api.primepellet.es/ofertas?bbdd=1');
    const ofertas = await response.json();
    return ofertas.map((oferta) => new ProductoModel(oferta));
};

// Funcion para buscar productos, marcas y productores de la api
export const buscar = async (searchValue) => {
    try {
        const response = await fetch(`https://api.primepellet.es/buscar?search=${searchValue}&bbdd=1`);

        if (!response.ok) {
            throw new Error('Error al buscar los productos, marcas y productores');
        }

        const productos = await response.json();
        const results = [];

        productos.forEach((producto) => {
            try {
                let modelInstance = null;
                let type = '';

                if (producto.tipo === 'Marca') {
                    modelInstance = new MarcaModel(producto);
                    type = producto.tipo;
                } else if (producto.tipo === 'Productor') {
                    modelInstance = new ProductorModel(producto);
                    type = producto.tipo;
                } else {
                    modelInstance = new ProductoModel(producto);
                    type = producto.tipo;
                }

                results.push({ modelInstance, type });
            } catch (error) {
                console.error(error);
            }
        });

        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar los productos, marcas y productores');
    }
};

export default ProductoModel;
