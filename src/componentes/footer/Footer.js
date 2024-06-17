import React from 'react'
/* import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub'; */
//import './footer.css'

// function Footer() {
//     return (

//         <footer >

//             <section className='section1'>

//                 <div className='section1div1'>
//                     <span>Get connected with us on social networks:</span>
//                 </div>

//                 <div>
//                     <a href="" className="me-4 text-reset">
//                         <FacebookOutlinedIcon></FacebookOutlinedIcon>
//                     </a>
//                     <a href="" className="me-4 text-reset">
//                         <TwitterIcon></TwitterIcon>
//                     </a>
//                     <a href="" className="me-4 text-reset">
//                         <GoogleIcon></GoogleIcon>
//                     </a>
//                     <a href="" className="me-4 text-reset">
//                         <InstagramIcon></InstagramIcon>
//                     </a>
//                     <a href="" className="me-4 text-reset">
//                         <LinkedInIcon></LinkedInIcon>
//                     </a>
//                     <a href="" className="me-4 text-reset">
//                         <GitHubIcon></GitHubIcon>
//                     </a>
//                 </div>

//             </section>



//             <section className='section2' >
//                 <div >

//                     <div className='section2Div2'>

//                         <div className='section2Div3' >

//                             <h6 ><i className="fas fa-gem me-3"></i>Company name</h6>
//                             <p>
//                                 Here you can use rows and columns to organize your footer content. Lorem ipsum
//                                 dolor sit amet, consectetur adipisicing elit.
//                             </p>
//                         </div>



//                         <div >

//                             <h6 >
//                                 Products
//                             </h6>
//                             <p>
//                                 <a href="#!" className="text-reset">Angular</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">React</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">Vue</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">Laravel</a>
//                             </p>
//                         </div>

//                         <div >

//                             <h6 >
//                                 Useful links
//                             </h6>
//                             <p>
//                                 <a href="#!" className="text-reset">Pricing</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">Settings</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">Orders</a>
//                             </p>
//                             <p>
//                                 <a href="#!" className="text-reset">Help</a>
//                             </p>
//                         </div>

//                         <div >

//                             <h6 >Contact</h6>
//                             <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
//                             <p>
//                                 <i className="fas fa-envelope me-3"></i>
//                                 info@example.com
//                             </p>
//                             <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
//                             <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
//                         </div>

//                     </div>

//                 </div>
//             </section>



//             <div className='div3' >
//                 © 2021 Copyright:
//                 <a href="https://mdbootstrap.com/">MDBootstrap.com</a>
//             </div>

//         </footer>


//     )
// }

// export default Footer

function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start" style={{background: 'linear-gradient(to right, black, blue, black)'}}>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white">

                    <div className="me-5 d-none d-lg-block">
                        <span>¡Conéctate con nosotros en nuestras redes sociales!</span>
                    </div>

                    <div>
                        <a href="#" className="me-4 text-white">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="me-4 text-white">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="me-4 text-white">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="me-4 text-white">
                            <i className="bi bi-linkedin"></i>
                        </a>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 text-white">
                                    Acerca de GadgetZone
                                </h6>
                                <p  className="text-white" >
                                    GadgetZone es tu tienda de confianza para todo lo relacionado con la tecnología. Ofrecemos una amplia gama de productos, incluyendo PC gamers, laptops, celulares, tablets, electrónica de consumo, electrodomésticos y accesorios electrónicos.
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 text-white">
                                    Productos
                                </h6>
                                <p>
                                    <a href="#" className="text-white">PC Gamers</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Laptops</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Celulares</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Tablets</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Electrónica de consumo</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Electrodomésticos</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Accesorios electrónicos</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 text-white">
                                <h6 className="text-uppercase fw-bold mb-4 text-white">
                                    Contacto
                                </h6>
                                <p className="text-white"><i className="fas fa-home me-3"></i> Ciudad de Gadget, GZ 12345, Colombia</p>
                                
                                <p  className="text-white" >
                                    <i className="fas fa-envelope me-3"></i>
                                    info@gadgetzone.com
                                </p>
                                <p  className="text-white"><i className="fas fa-phone me-3 "></i> +57 123 456 789</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4 text-white">
                    © 2024 GadgetZone. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    )
}

export default Footer;
