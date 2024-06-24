import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Registro.css'; // Importa los estilos CSS
import { Link } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

const Registro = () => {
    const [values, setValues] = useState({
        identificacion: "",
        nombres: "",
        apellidos: "",
        email: "",
        direccion: "",
        telefono: "",
        password: "",
        passRepeat: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_ENVIRONMENT}/registro-usuario`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            Swal.fire({
                title: "Usuario creado con éxito",
                icon: "success"
            });
            window.location.hash = '/login';
        } else {
            const data = await response.json();
            Swal.fire({
                title: data.message || 'Error al registrar el usuario',
                icon: "warning"
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div>
            <Header />
            <br></br><br></br><br></br>
            <div className='container-fluid bg-white' style={{ minHeight: '100vh', paddingTop: '50px' }}>
                <div className='row justify-content-center'>
                    <div className='col-lg-8 col-md-10 col-sm-12'>
                        <div className='card border border-primary'>
                            <div className='card-body p-4'>
                                <h2 className='text-uppercase text-center mb-4' style={{ color: 'blue' }}>Registro</h2>
                                <form onSubmit={handleSubmit} >
                                    <div className='form-outline mb-4'>
                                        <input type='text' id='form-identificacion' className={`form-control ${errors.identificacion ? 'is-invalid' : ''}`} name='identificacion' value={values.identificacion} onChange={handleChange} placeholder='Identificación' />
                                        {errors.identificacion && <p className='invalid-feedback'>El campo Identificación es requerido</p>}
                                    </div>
                                    {/* Repite para los demás campos */}
                                    <div className='d-flex justify-content-center'>
                                        <button type='submit' className='btn btn-success btn-lg'>Register</button>
                                    </div>
                                </form>
                                <p className='text-center text-muted mt-3 mb-0'>Already have an account? <Link to='/login' className='fw-bold text-dark'><u>Login here</u></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Registro;
