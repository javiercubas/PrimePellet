class PartnerModel {
    constructor({ id, nombre, descripcion, imagen, url }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.url = url;
    }
}

// Función para consultar todos los partners de la api
export const getPartners = async () => {
    const response = await fetch('https://api.primepellet.es/partners?bbdd=1');
    const partners = await response.json();
    return partners.map((partner) => new PartnerModel(partner));
};

export default PartnerModel;