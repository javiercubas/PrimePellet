import React from 'react'
import './Producto.css'
import { FaDownload } from 'react-icons/fa';

const Producto = (props) => {

    function calcularPrecios(precio, cp, tipoPallet) {
        const zona1 = [
            "19XXX",
            "28XXX"
        ];

        const zona2 = [
            "42XXX",
            "45XXX",
        ];

        const zona3 = [
            "02XXX",
            "05XXX",
            "09XXX",
            "26XXX",
            "40XXX",
            "47XXX",
            "50XXX",
        ];

        const zona4 = [
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
        ];

        const zona5 = [
            "03XXX",
            "12XXX",
            "20XXX",
            "25XXX",
            "30XXX",
            "33XXX",
            "39XXX",
            "43XXX",
            "48XXX",
        ];

        const zona6 = [
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
        ];

        const zona7 = [
            "04XXX",
            "11XXX",
            "15XXX",
            "17XXX",
            "21XXX",
            "27XXX",
            "29XXX",
            "32XXX",
            "36XXX",
        ];

        const zona8 = [];

        const zona9 = [];

        const zona10 = [
            "07XXX"
        ];

        const zona11 = [];

        const zona12 = [
            "35XXX",
            "38XXX",
        ];

        const noEnvios = [
            "51XXX",
            "52XXX",
        ];

        const tiposZona1 = {
            10: 38.8,
            20: 44.2,
            30: 58.3,
            40: 57.7,
            50: 62.6,
            72: 64.8,
            80: 64.8,
        }

        const tiposZona2 = {
            10: 39.9,
            20: 45.3,
            30: 59.4,
            40: 58.8,
            50: 65.8,
            72: 68.0,
            80: 68.0,
        }

        const tiposZona3 = {
            10: 43.2,
            20: 48.6,
            30: 62.1,
            40: 61.0,
            50: 69.1,
            72: 71.2,
            80: 71.2,
        }

        const tiposZona4 = {
            10: 46.4,
            20: 51.8,
            30: 68.0,
            40: 63.1,
            50: 75.6,
            72: 77.7,
            80: 77.7,
        }

        const tiposZona5 = {
            10: 46.9,
            20: 52.3,
            30: 69.6,
            40: 65.3,
            50: 79.3,
            72: 82.0,
            80: 82.0,
        }

        const tiposZona6 = {
            10: 48.0,
            20: 55.0,
            30: 75.0,
            40: 70.7,
            50: 87.4,
            72: 92.8,
            80: 92.8,
        }

        const tiposZona7 = {
            10: 52.3,
            20: 59.4,
            30: 85.0,
            40: 79.3,
            50: 99.3,
            72: 104.7,
            80: 104.7,
        }

        const tiposZona8 = {
            10: 53.4,
            20: 62.6,
            30: 102.6,
            40: 90.0,
            50: 120.9,
            72: 124.2,
            80: 124.2,
        }

        const tiposZona9 = {
            10: 75.6,
            20: 92.8,
            30: 146.3,
            40: 132.8,
            50: 167.9,
            72: 198.1,
            80: 198.1,
        }

        const tiposZona10 = {
            10: 77.7,
            20: 95.5,
            30: 152.2,
            40: 135.5,
            50: 172.2,
            72: 208.9,
            80: 208.9,
        }

        const tiposZona11 = {
            10: 76.1,
            20: 93.9,
            30: 196.5,
            40: 133.9,
            50: 187.3,
            72: 216.0,
            80: 216.0,
        }

        const tiposZona12 = {
            10: 111.7,
            20: 137.1,
            30: 181.4,
            40: 179.2,
            50: 237.0,
            72: 265.6,
            80: 265.6,
        }

        const todos = {
            zona1: tiposZona1,
            zona2: tiposZona2,
            zona3: tiposZona3,
            zona4: tiposZona4,
            zona5: tiposZona5,
            zona6: tiposZona6,
            zona7: tiposZona7,
            zona8: tiposZona8,
            zona9: tiposZona9,
            zona10: tiposZona10,
            zona11: tiposZona11,
            zona12: tiposZona12,
        };

        let precioFinal = 0;
        let estaDentro = false;
        let zona = 0;
        let tipo = 0;
        let i = 0;
        let j = 0;

        while (i < todos.length && !estaDentro) {
            if (todos[i].length > 0) {
                while (j < todos[i].length && !estaDentro) {
                    if (cp === todos[i][j]) {
                        estaDentro = true;
                        zona = i,
                            tipo = todos[i][j]
                    }
                    j++;
                }
            }
            i++;
        }

        if (estaDentro) {


        }
    }

    return (
        <div className="producto-page">
            <div className="multimedia-producto-page">
                <img src="../../assets/asturias-pack.jpg" alt="" className="img-producto-page" />
                <h3 className="title-section-producto">Datos técnicos y reglamentarios</h3>
                <div className="oneline-multimedia-file">
                    <FaDownload className="file-icon" />
                    <span className="file-title">Descargar certificado EN PLUS A1</span>
                </div>
                <div className="oneline-multimedia-file">
                    <FaDownload className="file-icon" />
                    <span className="file-title">Descargar certificado DIN PLUS</span>
                </div>
            </div>
            <div className="info-producto-page">
                <h1 className="title-producto-page">PELLET ASTURIAS PACK 72 uds</h1>
                <div className="shipping-container">
                    <a href="" className="shipping-link">
                        <p className="shipping-title">Recogida en tienda</p>
                    </a>
                    <a href="" className="shipping-link">
                        <p className="shipping-title">Envío a domicilio</p>
                    </a>
                </div>
                <div className="precio-producto-page">5,45 €/ud <span>(IVA INCLUIDO)</span></div>
                <div className="descripcion-producto-page">
                    <p>En esta página, encontrarás información detallada sobre el pellet de 15 kg Pellet Asturias, un producto de alta calidad para calentar tu hogar de manera eficiente. Conoce todas sus características y beneficios.</p>
                    <h3>Elaboración con madera natural de calidad</h3>
                    <p>El pellet de 15 kg Pellet Asturias está elaborado cuidadosamente utilizando madera natural de la más alta calidad. La materia prima proviene de subproductos como serrines, astillas y leñas descortezadas. Estos elementos son prensados a alta temperatura para crear los pellets, sin la necesidad de utilizar aditivos que puedan comprometer la calidad del producto final.</p>
                    <h3>Proceso de secado y tratamiento</h3>
                    <p>Después del prensado, los pellets se someten a un proceso de secado de banda a baja temperatura. Esto garantiza que la madera conserve su naturaleza y propiedades originales, evitando cualquier pérdida de calidad. El resultado es un pellet denso y con un contenido de humedad muy bajo, lo que contribuye a su eficiencia y rendimiento en estufas y calderas.</p>
                    <h3>Características técnicas</h3>
                    <ul>
                        <li><strong>Tipo de presentación:</strong> Pack</li>
                        <li><strong>Tipo de combustible:</strong> Pellets</li>
                        <li><strong>Origen:</strong> Nacional</li>
                    </ul>
                    <h3>Certificaciones y cumplimiento normativo</h3>
                    <p>Este pellet de 15 kg en Pellet Asturias cumple con todos los estándares técnicos y reglamentarios nacionales. Está respaldado por certificados que garantizan la calidad y la seguridad del producto.</p>
                    <h3>¡Disfruta de un hogar cálido y acogedor!</h3>
                    <p>No pierdas la oportunidad de asegurar el calor y el confort en tu hogar con estos pellets de calidad de Pellet Asturias.</p>
                    <p>Compra ahora y experimenta un ambiente agradable durante todo el invierno. No te arrepentirás de elegir el pellet de 15 kg de Pellet Asturias como tu opción de combustible eficiente y sostenible.</p>
                </div>
                <a href="/" className="cta-link">
                    <button className="cta-producto-page">COMPRAR AHORA</button>
                </a>
            </div>
        </div>
    )
}

export default Producto