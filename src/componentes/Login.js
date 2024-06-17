import React, { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import Header from './header/Header';
import Footer from './footer/Footer';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import './Login.css'; // Importamos los estilos CSS personalizados

const Login = () => {
    const cookies = new Cookies();
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleClickPassword = () => {
        setErrorPassword(false);
    };

    const handleClickEmail = () => {
        setErrorEmail(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();

        if (values.password.length === 0 && values.email.length === 0) {
            setErrorEmail(true);
            setErrorPassword(true);
            return;
        }
        if (values.password.length === 0) {
            setErrorPassword(true);
            return;
        }
        if (values.email.length === 0) {
            setErrorEmail(true);
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_ENVIRONMENT + '/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();

                cookies.set('email', values.email, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                window.location.hash = '/sesion';
            } else {
                // Si la respuesta no es OK, intentamos parsear el error en formato JSON.
                let errorMessage = 'Las credenciales ingresadas no son correctas';
                try {
                    const errorData = await response.text();
                    errorMessage = errorData;
                } catch (error) {
                    console.error('Error al parsear la respuesta del servidor:', error);
                }

                Swal.fire({
                    title: "Error de inicio de sesión",
                    text: errorMessage,
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "No se puede iniciar sesión por un problema en el servidor",
                text: error.message,
                icon: "error"
            });
            window.location.hash = '/login';
        }
    };

    useEffect(() => {
        if (cookies.get('email')) {
            window.location.hash = '/sesion';
        }
    }, [cookies]);

    return (
        <div>
            <Header />
            <form onSubmit={iniciarSesion}>
            <h3 className="mb-5">Iniciar Sesión</h3> {/* Título del formulario */}
                <section className="vh-100 bg-dark">
                    <div className="container py-5 h-100 ">
                        <div className="row d-flex justify-content-center align-items-center h-100 ">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
                                <div className="card shadow-2-strong rounded border-white text-white bg-dark">
                                    <div className="card-body p-5 text-center">
                                        <h3 className="mb-5">Iniciar Sesión</h3> {/* Título del formulario */}

                                        <div className="form-outline mb-4">
                                            <div className='text-start'>
                                                <label className="form-label text-white" htmlFor="typeEmailX-2">Correo Electrónico</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errorEmail ? 'is-invalid' : ''} bg-dark text-white`}
                                                    name='email'
                                                    onChange={handleChange}
                                                    onClick={handleClickEmail}
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><AlternateEmailIcon /></span>
                                                </div>
                                            </div>
                                            {errorEmail && <span className='text-start text-danger'>Debe ingresar un correo electrónico</span>}
                                        </div>

                                        <div className="form-outline mb-4">
                                            <div className='text-start'>
                                                <label className="form-label text-white" htmlFor="typePasswordX-2">Contraseña</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type={showPassword ? "password" : "text"}
                                                    className={`form-control ${errorPassword ? 'is-invalid' : ''} bg-dark text-white`}
                                                    name='password'
                                                    onChange={handleChange}
                                                    onClick={handleClickPassword}
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><PasswordIcon onClick={handleShowPassword} /></span>
                                                </div>
                                            </div>
                                            {errorPassword && <span className='text-start text-danger'>Debe ingresar una contraseña</span>}
                                        </div>

                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Iniciar </button>
                                        </div>

                                        <hr className="my-4" />

                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <button className="btn btn-lg btn-block btn-danger mb-2" type="button">
                                                <GoogleIcon /> Iniciar Sesión con Google
                                            </button>
                                            <button className="btn btn-lg btn-block btn-primary" type="button">
                                                <FacebookIcon /> Iniciar Sesión con Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Footer />
        </div>
    );
}

export default Login;
