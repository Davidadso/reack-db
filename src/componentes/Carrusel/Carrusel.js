import React from 'react';
import imagen1 from './lavador.jpg';
import imagen2 from './aple.jpeg';
import imagen3 from './reloj.jpg';
import imagen4 from './dispositivos.jpg';
import imagen5 from './laptops.jpeg';
import imagen6 from './epods.jpg';
import imagen7 from './televisor.jpg';
import './carrusel.css';

function Carrusel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
            </div>
            
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="1000">
                    <img class="carousel" src={imagen1} className="d-block w-100" width="2000px" alt="2000px" />
                </div>
                <div className="carousel-item">
                    <img src={imagen2} className="d-block w-100"   />
                </div>
                <div className="carousel-item" >
                    <img src={imagen3} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" >
                    <img src={imagen4} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" >
                    <img src={imagen5} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" >
                    <img src={imagen6} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item" >
                    <img src={imagen7} className="d-block w-100" alt="..." />
                </div>
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carrusel;
