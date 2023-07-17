import React from 'react'
import './Menu.css'

const Menu = () => {
    return (
        <>
            <div className="contact">
                <h3 className="header-menu">VENTAS</h3>
                <h4 className="content-menu">ATENCIÓN COMERCIAL: <a href="tel:+34919391736">919 391 736</a></h4>
                <h3 className="header-menu">LOGÍSTICA</h3>
                <a href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><h4 className="content-menu">CALLE REAL 1-A <br></br> TORREJÓN DE LA CALZADA <br></br> (29991) MADRID <br></br> (junto a los desguaces)</h4></a>
            </div>
            <a href='https://www.google.es/maps/dir//MATCENTER+EUROPE+S.L.U.,+Cam.+de+Humanes+a+Torrej%C3%B3n+de+Velasco,+6,+28991+Torrej%C3%B3n+de+la+Calzada,+Madrid/@40.2079961,-3.8642629,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd4190485fc6e097:0x95dd97c3121f41f9!2m2!1d-3.7939569!2d40.2080505!3e0?hl=es'><div className="mapa"></div></a>
            <div className='familias'>
                <img src='./assets/Pantalla almacén.jpg' alt='familia' className='familia' />
                <img src='./assets/Pantalla almacén_page-0099.jpg' alt='familia' className='familia' />

                <img src='./assets/Pantalla almacén (1).jpg' alt='familia' className='familia' />
                <img src='./assets/Pantalla almacén_page-0100.jpg' alt='familia' className='familia' />

                <img src='./assets/woodpellet-pack.jpg' alt='Woodpellet Pack' className='familia' />
                <img src='./assets/woodpellet.jpg' alt='Woodpellet' className='familia' />

                <img src='./assets/gme-pack.jpg' alt='GME Pack' className='familia' />
                <img src='./assets/gme.jpg' alt='GME Energy' className='familia' />
            </div>
        </>
    )
}

export default Menu