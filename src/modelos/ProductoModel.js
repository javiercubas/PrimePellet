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
    }
}

// Función para consultar todos los productos de la api
export const getProductos = async () => {
    const response = await fetch('https://93.93.118.169/productos');
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para consultar un producto de la api
export const getProducto = async (id) => {
    const response = await fetch(`https://93.93.118.169/productos/${id}`);
    const producto = await response.json();
    return new ProductoModel(producto);
};

export default ProductoModel;
