import React, { useEffect } from 'react'
import CardList from './body/CardList';
import Header2 from './header/Header2'
import Footer from './footer/Footer';
import Carrusel from './Carrusel/Carrusel';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2'
import logo from './logo.png'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import MainLayout2 from './body/MainLayout2';

function InicioSesionIniciada() {
    
    return (
        <div>
            
            {/* <img  className="w-3/4" src={logo} alt='logo' /> */}
            <PersonSharpIcon/>
            <MainLayout2/>
            
            <Footer />
        </div>
    )
}

export default InicioSesionIniciada