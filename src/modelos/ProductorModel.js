class ProductorModel {
    constructor({ id, nombre, descripcion, imagen }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

// Función para consultar todos los productores de la api
export const getProductores = async () => {
    const response = await fetch('https://api.primepellet.es/productores?bbdd=1');
    const productores = await response.json();
    return productores.map((productor) => new ProductorModel(productor));
};

// Función para buscar productores de la api
export const buscarProductores = async (query) => {
    const response = await fetch(`https://api.primepellet.es/productores?search=${query}&bbdd=1`);
    const productores = await response.json();
    return productores.map((productor) => new ProductorModel(productor));
};

export default ProductorModel;  