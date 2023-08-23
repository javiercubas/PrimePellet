import React, { useState } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los íconos de flecha
import './FinalizaTuCompra.css';
import './Carousel.css'; // Asegúrate de tener los estilos del carrusel

const PromoPopUp = (props) => {
  const { onClose } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['../../assets/promo-thermorossi.png', '../../assets/promo-thermorossi-2.png']; // Reemplaza con tus imágenes

  const closePopup = () => {
    onClose();
  };

  const showNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const showPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div id="popup-container" className="popup-container">
      <div className="popup-background"></div>
      <div className="finaliza-content" style={{ padding: 0 }}>
        <FaTimes className="finaliza-close-icon" onClick={closePopup} style={{ zIndex: 1000 }}/>
        <div className="carousel">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={image} alt={`Imagen ${index}`} />
            </div>
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow prev-arrow" onClick={showPrevSlide}>
            <FaArrowLeft />
          </button>
          <button className="carousel-arrow next-arrow" onClick={showNextSlide}>
            <FaArrowRight />
          </button>
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoPopUp;