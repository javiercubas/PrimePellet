class MarcaModel {
    constructor({ id, nombre, descripcion, imagen }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

// Función para consultar todas las marcas de la api
export const getMarcas = async () => {
    const response = await fetch('https://api.primepellet.es/marcas');
    const marcas = await response.json();
    return marcas.map((marca) => new MarcaModel(marca));
};

// Función para buscar marcas de la api
export const buscarMarcas = async (query) => {
    const response = await fetch(`https://api.primepellet.es/marcas?search=${query}`);
    const marcas = await response.json();
    return marcas.map((marca) => new MarcaModel(marca));
};

export default MarcaModel;