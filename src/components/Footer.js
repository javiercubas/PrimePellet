import React from 'react'
import './Footer.css'

const Footer = () => {

    return (
        <div className="footer-container">
            <div className="contact">
                <div className='left-content'>
                    <h3 className="header-menu">CONTACTO</h3>
                    <h4 className="content-menu">ATENCIÓN COMERCIAL: <a href="tel:+34623190390">623 190 390</a></h4>
                    <a target="_blank" href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><h4 className="content-menu">CALLE REAL 1-A TORREJÓN DE LA CALZADA (29991) MADRID (junto a los desguaces)</h4></a>
                </div>
                <div className='rigth-content'>
                    <a target="_blank" href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><div className="mapa"></div></a>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-bottom-text">© 2023 primePELLET. Todos los derechos reservados.</p>
                <a href="/terminos-y-condiciones" className="footer-button">Terminos y condiciones</a>
            </div>
        </div>
    )
}

export default Footer