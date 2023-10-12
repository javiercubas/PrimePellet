import React from 'react'
import './Producto.css'
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import FinalizaTuCompra from '../components/FinalizaTuCompra';

const Producto = (props) => {

    const { nombre, imagen, precio, descripcion, pack, estrellas } = props;

    const precioPack = precio * pack;

    const [codigoPostal, setCodigoPostal] = useState(); // Estado para manejar el código postal

    // Obtener el código postal de las cookies al cargar el componente
    useEffect(() => {
        const cookies = new Cookies();
        const codigoPostalGuardado = cookies.get('codigoPostal');
        if (codigoPostalGuardado) {
            setCodigoPostal(codigoPostalGuardado);
        }
    }, []);


    function calcularPrecios(precio, cp, tipoPallet) {

        // Use optional chaining to access toString method safely
        const codigoPostalStr = cp?.toString();

        if (!codigoPostalStr) {
            console.log('El código postal no está definido.');
            return;
        }
        else {

            const zonas = {
                zona1:
                    [
                        "19XXX",
                        "28XXX"
                    ],

                zona2: [
                    "42XXX",
                    "45XXX",
                ],

                zona3: [
                    "02XXX",
                    "05XXX",
                    "09XXX",
                    "26XXX",
                    "40XXX",
                    "47XXX",
                    "50XXX",
                ],

                zona4: [
                    "01XXX",
                    "13XXX",
                    "16XXX",
                    "22XXX",
                    "24XXX",
                    "31XXX",
                    "34XXX",
                    "37XXX",
                    "44XXX",
                    "46XXX",
                    "49XXX",
                ],

                zona5: [
                    "03XXX",
                    "12XXX",
                    "20XXX",
                    "25XXX",
                    "30XXX",
                    "33XXX",
                    "39XXX",
                    "43XXX",
                    "48XXX",
                ],

                zona6: [
                    "06XXX",
                    "08XXX",
                    "10XXX",
                    "14XXX",
                    "18XXX",
                    "23XXX",
                    "41XXX",
                    "24300",
                    "24301",
                    "24302",
                    "24303",
                    "24304",
                    "24305",
                    "24306",
                    "24307",
                    "24308",
                    "24309",
                    "24310",
                    "24311",
                    "24312",
                    "24313",
                    "24314",
                    "24315",
                    "24316",
                    "24317",
                    "24318",
                    "24319",
                    "24367",
                    "24368",
                    "24369",
                    "24370",
                    "24371",
                    "24372",
                    "24373",
                    "24374",
                    "24375",
                    "24376",
                    "24377",
                    "24378",
                    "24379",
                    "24380",
                    "24385",
                    "24386",
                    "24387",
                    "24388",
                    "24389",
                    "24390",
                    "24394",
                    "24395",
                    "24398",
                    "24399",
                    "24400",
                    "24401",
                    "24402",
                    "24403",
                    "24404",
                    "24405",
                    "24406",
                    "24407",
                    "24408",
                    "24409",
                    "24410",
                    "24411",
                    "24412",
                    "24413",
                    "24414",
                    "24415",
                    "24416",
                    "24417",
                    "24418",
                    "24419",
                    "24420",
                    "24421",
                    "24422",
                    "24423",
                    "24424",
                    "24425",
                    "24426",
                    "24427",
                    "24428",
                    "24429",
                    "24430",
                    "24431",
                    "24432",
                    "24433",
                    "24434",
                    "24435",
                    "24436",
                    "24437",
                    "24438",
                    "24439",
                    "24440",
                    "24441",
                    "24442",
                    "24443",
                    "24444",
                    "24445",
                    "24446",
                    "24447",
                    "24448",
                    "24449",
                    "24450",
                    "24451",
                    "24452",
                    "24453",
                    "24454",
                    "24455",
                    "24456",
                    "24457",
                    "24458",
                    "24459",
                    "24460",
                    "24461",
                    "24462",
                    "24463",
                    "24464",
                    "24465",
                    "24466",
                    "24467",
                    "24468",
                    "24469",
                    "24470",
                    "24471",
                    "24472",
                    "24473",
                    "24474",
                    "24475",
                    "24476",
                    "24477",
                    "24478",
                    "24479",
                    "24488",
                    "24490",
                    "24491",
                    "24492",
                    "24493",
                    "24494",
                    "24500",
                    "24501",
                    "24502",
                    "24503",
                    "24504",
                    "24505",
                    "24506",
                    "24507",
                    "24508",
                    "24509",
                    "24510",
                    "24511",
                    "24512",
                    "24513",
                    "24514",
                    "24515",
                    "24516",
                    "24517",
                    "24518",
                    "24519",
                    "24520",
                    "24521",
                    "24522",
                    "24523",
                    "24524",
                    "24525",
                    "24526",
                    "24527",
                    "24528",
                    "24529",
                    "24530",
                    "24531",
                    "24532",
                    "24533",
                    "24534",
                    "24535",
                    "24536",
                    "24537",
                    "24538",
                    "24539",
                    "24540",
                    "24541",
                    "24542",
                    "24543",
                    "24544",
                    "24545",
                    "24546",
                    "24547",
                    "24548",
                    "24549",
                    "24550",
                    "24551",
                    "24552",
                    "24553",
                    "24554",
                    "24555",
                    "24556",
                    "24557",
                    "24558",
                    "24559",
                    "24560",
                    "24561",
                    "24562",
                    "24563",
                    "24564",
                    "24565",
                    "24566",
                    "24567",
                    "24568",
                    "24569",
                    "24700",
                    "24700",
                    "24701",
                    "24702",
                    "24703",
                    "24704",
                    "24705",
                    "24706",
                    "24707",
                    "24708",
                    "24709",
                    "24710",
                    "24714",
                    "24715",
                    "24716",
                    "24717",
                    "24718",
                    "24720",
                    "24721",
                    "24722",
                    "24723",
                    "24724",
                    "24725",
                    "24726",
                    "24727",
                    "24728",
                    "24729",
                    "24730",
                    "24731",
                    "24732",
                    "24733",
                    "24734",
                    "24735",
                    "24736",
                    "24737",
                    "24738",
                    "24739",
                    "24740",
                    "24741",
                    "24742",
                    "24743",
                    "24744",
                    "24745",
                    "24746",
                    "24747",
                    "24748",
                    "24749",
                    "24750",
                    "24764",
                    "24765",
                    "24766",
                    "24767",
                    "24793",
                    "24794",
                    "24795",
                    "33700",
                    "33701",
                    "33702",
                    "33703",
                    "33704",
                    "33705",
                    "33706",
                    "33707",
                    "33708",
                    "33709",
                    "33710",
                    "33711",
                    "33712",
                    "33713",
                    "33714",
                    "33715",
                    "33716",
                    "33717",
                    "33718",
                    "33719",
                    "33720",
                    "33724",
                    "33725",
                    "33726",
                    "33727",
                    "33728",
                    "33729",
                    "33730",
                    "33731",
                    "33732",
                    "33733",
                    "33734",
                    "33735",
                    "33736",
                    "33740",
                    "33741",
                    "33742",
                    "33743",
                    "33744",
                    "33745",
                    "33746",
                    "33747",
                    "33749",
                    "33750",
                    "33757",
                    "33758",
                    "33759",
                    "33760",
                    "33761",
                    "33762",
                    "33763",
                    "33764",
                    "33765",
                    "33766",
                    "33767",
                    "33768",
                    "33769",
                    "33770",
                    "33771",
                    "33772",
                    "33773",
                    "33774",
                    "33775",
                    "33776",
                    "33777",
                    "33778",
                    "33779",
                    "33780",
                    "33781",
                    "33782",
                    "33783",
                    "33784",
                    "33785",
                    "33787",
                    "33788",
                    "33789",
                    "33790",
                    "33791",
                    "33792",
                    "33793",
                    "33794",
                    "33795",
                    "33796",
                    "33797",
                    "33798",
                    "33799",
                    "33800",
                    "33801",
                    "33802",
                    "33803",
                    "33804",
                    "33805",
                    "33806",
                    "33807",
                    "33808",
                    "33809",
                    "33810",
                    "33811",
                    "33812",
                    "33813",
                    "33814",
                    "33815",
                    "33816",
                    "33817",
                    "33818",
                    "33819",
                    "33827",
                    "33830",
                    "33831",
                    "33832",
                    "33833",
                    "33834",
                    "33835",
                    "33836",
                    "33837",
                    "33838",
                    "33839",
                    "33842",
                    "33843",
                    "33844",
                    "33845",
                    "33846",
                    "33847",
                    "33848",
                    "33849",
                    "33850",
                    "33851",
                    "33852",
                    "33853",
                    "33854",
                    "33855",
                    "33856",
                    "33857",
                    "33858",
                    "33859",
                    "33860",
                    "33866",
                    "33867",
                    "33868",
                    "33869",
                    "33870",
                    "33871",
                    "33872",
                    "33873",
                    "33874",
                    "33875",
                    "33876",
                    "33877",
                    "33878",
                    "33879",
                    "33880",
                    "33881",
                    "33882",
                    "33883",
                    "33884",
                    "33885",
                    "33887",
                    "33888",
                    "33889",
                    "33890",
                    "33891",
                ],

                zona7: [
                    "04XXX",
                    "11XXX",
                    "15XXX",
                    "17XXX",
                    "21XXX",
                    "27XXX",
                    "29XXX",
                    "32XXX",
                    "36XXX",
                ],

                zona8: [],

                zona9: [],

                zona10: [
                    "07XXX"
                ],

                zona11: [],

                zona12: [
                    "35XXX",
                    "38XXX",
                ],

                noEnvios: [
                    "51XXX",
                    "52XXX",
                ],
            }

            const tiposZona = {
                zona1: {
                    1: 38.8,
                    10: 38.8,
                    20: 44.2,
                    30: 58.3,
                    40: 57.7,
                    50: 62.6,
                    60: 64.8,
                    70: 64.8,
                    72: 64.8,
                    80: 64.8,
                },

                zona2: {
                    1: 39.9,
                    10: 39.9,
                    20: 45.3,
                    30: 59.4,
                    40: 58.8,
                    50: 65.8,
                    60: 68.0,
                    70: 68.0,
                    72: 68.0,
                    80: 68.0,
                },

                zona3: {
                    1: 43.2,
                    10: 43.2,
                    20: 48.6,
                    30: 62.1,
                    40: 61.0,
                    50: 69.1,
                    60: 71.2,
                    70: 71.2,
                    72: 71.2,
                    80: 71.2,
                },

                zona4: {
                    1: 46.4,
                    10: 46.4,
                    20: 51.8,
                    30: 68.0,
                    40: 63.1,
                    50: 75.6,
                    60: 77.7,
                    70: 77.7,
                    72: 77.7,
                    80: 77.7,
                },

                zona5: {
                    1: 46.9,
                    10: 46.9,
                    20: 52.3,
                    30: 69.6,
                    40: 65.3,
                    50: 79.3,
                    60: 82.0,
                    70: 82.0,
                    72: 82.0,
                    80: 82.0,
                },

                zona6: {
                    1: 48.0,
                    10: 48.0,
                    20: 55.0,
                    30: 75.0,
                    40: 70.7,
                    50: 87.4,
                    60: 92.8,
                    70: 92.8,
                    72: 92.8,
                    80: 92.8,
                },

                zona7: {
                    1: 52.3,
                    10: 52.3,
                    20: 59.4,
                    30: 85.0,
                    40: 79.3,
                    50: 99.3,
                    60: 104.7,
                    70: 104.7,
                    72: 104.7,
                    80: 104.7,
                },

                zona8: {
                    1: 53.4,
                    10: 53.4,
                    20: 62.6,
                    30: 102.6,
                    40: 90.0,
                    50: 120.9,
                    60: 124.2,
                    70: 124.2,
                    72: 124.2,
                    80: 124.2,
                },

                zona9: {
                    1: 75.6,
                    10: 75.6,
                    20: 92.8,
                    30: 146.3,
                    40: 132.8,
                    50: 167.9,
                    60: 198.1,
                    70: 198.1,
                    72: 198.1,
                    80: 198.1,
                },

                zona10: {
                    1: 77.7,
                    10: 77.7,
                    20: 95.5,
                    30: 152.2,
                    40: 135.5,
                    50: 172.2,
                    60: 208.9,
                    70: 208.9,
                    72: 208.9,
                    80: 208.9,
                },

                zona11: {
                    1: 76.1,
                    10: 76.1,
                    20: 93.9,
                    30: 196.5,
                    40: 133.9,
                    50: 187.3,
                    60: 216.0,
                    70: 216.0,
                    72: 216.0,
                    80: 216.0,
                },

                zona12: {
                    1: 111.7,
                    10: 111.7,
                    20: 137.1,
                    30: 181.4,
                    40: 179.2,
                    50: 237.0,
                    60: 265.6,
                    70: 265.6,
                    72: 265.6,
                    80: 265.6,
                }
            }

            let estaDentro = false;
            let zona = "";
            let tipo = 0;

            // Buscar una coincidencia exacta del código postal en alguna zona
            const keys = Object.keys(zonas);
            let i = 0;
            while (i < keys.length && !estaDentro) {
                const key = keys[i];
                const codigosPostalesZona = zonas[key];
                if (codigosPostalesZona.includes(cp)) {
                    estaDentro = true;
                    zona = key;
                    tipo = tiposZona[zona][tipoPallet];
                }
                i++;
            }

            // Si el código postal completo no se encuentra en ninguna zona, buscar por los dos primeros dígitos
            if (!estaDentro) {
                const dosPrimerosDigitosCP = cp.substring(0, 2);
                const keys2 = Object.keys(zonas);
                let j = 0;
                while (j < keys2.length && !estaDentro) {
                    const key = keys2[j];
                    const codigosPostalesZona = zonas[key];
                    let k = 0;
                    while (k < codigosPostalesZona.length && !estaDentro) {
                        if (codigosPostalesZona[k].startsWith(dosPrimerosDigitosCP)) {
                            estaDentro = true;
                            zona = key;
                            tipo = tiposZona[zona][tipoPallet];
                        }
                        k++;
                    }
                    j++;
                }
            }

            if (estaDentro) {
                tipo = tipo * 1.21;
                const precioFinal = (precio + tipo).toFixed(2);
                console.log(`El precio final para el código postal ${cp} y tipo de pallet ${tipoPallet} es: ${precioFinal}`);
                return precioFinal;
            } else {
                console.log(`El código postal ${cp} no se encuentra en ninguna zona válida.`);
                return 0;
            }
        }
    }

    const [envio, setEnvio] = useState(false); // Estado para manejar el tipo de envío
    const precioFinal = calcularPrecios(precioPack, codigoPostal, pack);


    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición del código postal
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar si se muestra el alert

    // Función para comprobar si un valor es un número entero
    const isInteger = (value) => {
        return /^\d+$/.test(value);
    };

    // Función para comprobar si el código postal es válido
    const isValidCodigoPostal = (codigoPostal) => {
        if (!isInteger(codigoPostal)) {
            return false;
        }

        const parsedCodigoPostal = parseInt(codigoPostal, 10);
        return parsedCodigoPostal >= 1000 && parsedCodigoPostal <= 50999;
    };

    // Función para guardar el código postal en las cookies y actualizar el estado
    const handleGuardarCodigoPostal = (newCodigoPostal) => {
        if (isValidCodigoPostal(newCodigoPostal)) {
            setCodigoPostal(newCodigoPostal);
            setIsEditing(false);
            setShowAlert(false); // Reiniciar el estado de showAlert cuando el código postal sea válido

            // Guardar el código postal en las cookies
            const cookies = new Cookies();
            cookies.set('codigoPostal', newCodigoPostal, { path: '/' });
        } else {
            setShowAlert(true); // Mostrar el alert si el código postal no es válido
        }
    };

    // Controlador de evento para guardar el código postal al presionar "Enter"
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleGuardarCodigoPostal(event.target.value);
        }
    };

    const [valoracion, setValoracion] = useState(estrellas); // Aquí puedes cambiar el valor de ejemplo

    // Genera un array de estrellas basado en la valoración del producto
    const generarEstrellas = () => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                i <= valoracion ? (
                    <span key={i} className="estrella-llena">
                        &#9733;
                    </span>
                ) : (
                    <span key={i} className="estrella-vacia">
                        &#9734;
                    </span>
                )
            );
        }
        return estrellas;
    };

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar si se muestra el popup

    // Función para mostrar el popup
    const handleShowPopup = () => {
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="producto-page">
            <div className="multimedia-producto-page">
                <img src={imagen} alt={nombre} className="img-producto-page" />
                <h3 className="title-section-producto">Valoraciones</h3>
                <p className="descripcion-valoraciones">
                    Los productos son evaluados por expertos en la materia, quienes han otorgado una valoración de {valoracion} sobre 5 estrellas. La valoración se basa en criterios como la calidad del producto, la sostenibilidad, la eficiencia energética y la satisfacción del cliente. Puedes confiar en que nuestras valoraciones reflejan la excelencia de nuestros productos.
                </p>
                <div className="estrellas">{generarEstrellas()}</div>
            </div>
            <div className="info-producto-page">
                <h1 className="title-producto-page">{nombre}</h1>
                <div className="shipping-container">
                    <button onClick={() => setEnvio(false)} className={!envio ? 'shipping-title active' : 'shipping-title'}>Recogida en tienda</button>
                    <button onClick={() => setEnvio(true)} className={envio ? 'shipping-title active' : 'shipping-title'}>Envío a domicilio</button>
                </div>
                {!envio ? (
                    <></>
                ) : (
                    <div className="cp-container">
                        {isEditing ? (
                            <div className="editar-cp">
                                <input
                                    type="text"
                                    className="cp-input"
                                    defaultValue={codigoPostal}
                                    onBlur={(e) => handleGuardarCodigoPostal(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="cp-button" onClick={() => handleGuardarCodigoPostal(codigoPostal)}>Actualizar</button>
                            </div>
                        ) : codigoPostal == undefined ? (
                            <p className="cp-envio" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                                Añadir un código postal para calcular el precio <FaPlus size={15} color="#008000" />
                            </p>
                        )
                            :
                            (
                                <p className="cp-envio" onClick={() => setIsEditing(true)}>
                                    Código postal: <span>{codigoPostal}</span> <FaPencilAlt size={15} style={{ cursor: 'pointer' }} color="#008000" />
                                </p>
                            )}
                        {showAlert && (
                            <p className="alert-text">El código postal debe ser un número de 5 dígitos entre 01000 y 50999.</p>
                        )}
                    </div>
                )}
                {!envio ? (
                    <div className="precio-producto-page">{precioPack.toFixed(2)} € <span>(IVA INCLUIDO)</span></div>
                ) : (
                    <div className="precio-producto-page">{precioFinal} € <span>(IVA INCLUIDO)</span></div>
                )}
                <div className="descripcion-producto-page">
                    <div dangerouslySetInnerHTML={{ __html: descripcion }} />
                </div>
                <button className="cta-producto-page" onClick={handleShowPopup}>COMPRAR AHORA</button>
                {showPopup && <FinalizaTuCompra nombre={nombre} imagen={imagen} precioPack={precioPack} envio={envio} precioFinal={precioFinal} onClose={() => {
                    setShowPopup(false);
                    document.body.style.overflow = 'unset';
                }} />}
            </div>
        </div>
    )
}

export default Producto