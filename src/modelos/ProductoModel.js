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

// Función para consultar 4 productos de la marca de la api
export const getMarcaProductos = async (id, limit) => {
    const response = await fetch(`https://93.93.118.169/marcas/${id}/productos?limit=${limit}`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para consultar un producto de la api
export const getProducto = async (id) => {
    const response = await fetch(`https://93.93.118.169/productos/${id}`);
    const producto = await response.json();
    return new ProductoModel(producto);
};

// Función para buscar productos de la api
export const buscarProductos = async (query) => {
    const response = await fetch(`https://93.93.118.169/productos?search=${query}`);
    const productos = await response.json();
    return productos.map((producto) => new ProductoModel(producto));
};

// Función para cargar ofertas de la api
export const getOfertas = async () => {
    const response = await fetch('https://93.93.118.168/ofertas');
    const ofertas = await response.json();
    return ofertas.map((oferta) => new ProductoModel(oferta));
};

// Funcion para buscar productos, marcas y productores de la api
export const buscar = async (query) => {
    const response = await fetch(`https://93.93.118.169/buscar?search=${searchValue}`);
    const productos = await response.json();
    // Guardamos los resultados en un array
    const results = [];
    // Recorremos los productos
    productos.forEach((producto) => {
        // Agregamos el producto al array de resultados
        results.push(new ProductoModel(producto));
    }
    );

    // Recorremos las marcas
    marcas.forEach((marca) => {
        // Agregamos la marca al array de resultados
        results.push(new MarcaModel(marca));
    }
    );

    // Recorremos los productores
    productores.forEach((productor) => {
        // Agregamos el productor al array de resultados
        results.push(new ProductorModel(productor));
    }
    );
    
    // Retornamos los resultados
    return results;
};

export default ProductoModel;
