class ClienteModel {
    constructor({
        id,
        nombre,
        apellidos,
        correo,
        telefono,
        direccion,
        codigoPostal,
        provincia,
        localidad,
        dni,
        producto,
        precio,
        pagado,
    }) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
        this.dni = dni;
        this.producto = producto;
        this.precio = precio;
        this.pagado = pagado;
    }
}

export const addCliente = async (cliente) => {
    try {
        const response = await fetch('https://api.primepellet.es/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) {
            throw new Error('Error al añadir el cliente');
        }

        const clienteResponse = await response.json();
        
        // Aquí se agrega el retorno del ID del cliente recién creado
        return clienteResponse.insertId;
    } catch (error) {
        console.error(error);
        throw new Error('Error al añadir el cliente');
    }
};

// Funcion para actualizar el pago de un cliente
export const updateCliente = async (id, estado) => {
    try {
        const response = await fetch(`https://api.primepellet.es/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pagado: estado }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el pago del cliente');
        }

        const clienteResponse = await response.json();
        return new ClienteModel(clienteResponse);
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el pago del cliente');
    }
};

export default ClienteModel;  