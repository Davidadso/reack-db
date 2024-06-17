import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import './Registro.css'; // Importa los estilos CSS
import { Link } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function Registro() {
   
    const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const [errors, setErrors] = useState({
        identificacion: false,
        nombres: false,
        apellidos: false,
        email: false,
        direccion: false,
        telefono: false,
        password: false,
        passRepeat: false,
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: false });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        for (const key in values) {
            if (values[key].trim() === "" || (key === 'telefono' && values[key].length !== 10)) {
                newErrors[key] = true;
            } else {
                newErrors[key] = false;
            }
        }

        if (!validEmailRegex.test(values.email)) {
            newErrors.email = true;
        }

        if (values.password !== values.passRepeat || !validPasswordRegex.test(values.password)) {
            newErrors.passRepeat = true;
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every(error => !error)) {
            try {
                const response = await fetch(process.env.REACT_APP_ENVIRONMENT + '/registro-usuario', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
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
                        title: data.message,
                        icon: "warning"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "No fue posible finalizar el proceso de registro por un error interno del servidor",
                    icon: "error"
                });
            }
        }
    }

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
                                    {Object.entries(values).map(([key, value]) => (
                                        <div className='form-outline mb-4' key={key}>
                                            <input type={key === 'password' || key === 'passRepeat' ? 'password' : 'text'} id={`form-${key}`} className={`form-control ${errors[key] ? 'is-invalid' : ''}`} name={key} value={value} onChange={handleChange} placeholder={key[0].toUpperCase() + key.slice(1)} />
                                            {errors[key] && <p className='invalid-feedback'>El campo {key} es requerido{(key === 'telefono' && value.length !== 10) ? " y debe tener 10 dígitos" : ""}</p>}
                                        </div>
                                    ))}
                                    {errors.email && <p className='text-danger'>El email debe tener la estructura de una dirección de correo electrónico. Por ejemplo: alguien@gmail.com</p>}
                                    {errors.passRepeat && <p className='text-danger'>Las contraseñas ingresadas no coinciden o no cumplen con los requisitos mínimos</p>}
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
}
