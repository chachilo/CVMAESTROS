import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ModalNotificacion from './ModalNotificacion';

const Captcha = ({ num1, num2, captchaAnswer, setCaptchaAnswer, verificarCaptcha, captchaValid }) => {
    return (
        <div className="mb-3 p-3 border rounded">
            <div className="text-center mb-2" key={`${num1}+${num2}`}>
                {num1} + {num2} = ?
            </div>
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Respuesta"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-dark w-100"
                onClick={verificarCaptcha}
            >
                Verificar
            </button>
            {captchaValid && <div className="text-success mt-2">¡Verificado!</div>}
        </div>
    );
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMensaje, setModalMensaje] = useState('');
    const [modalTipo, setModalTipo] = useState('success');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);

    useEffect(() => {
        generarCaptcha();
    }, []);

    const generarCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setNum1(n1);
        setNum2(n2);
        setCaptchaAnswer('');
        setCaptchaValid(false);
        console.log("Nuevo CAPTCHA generado:", n1, "+", n2);
    };

    const verificarCaptcha = () => {
        const respuestaUsuario = parseInt(captchaAnswer);
        console.log("Respuesta del usuario:", respuestaUsuario);
        console.log("Respuesta correcta:", num1 + num2);
        if (respuestaUsuario === num1 + num2) {
            setCaptchaValid(true);
            mostrarModal('¡CAPTCHA correcto! Ahora puedes registrarte.', 'success');
        } else {
            mostrarModal('Respuesta de verificación incorrecta. Inténtalo de nuevo.', 'danger');
            generarCaptcha();
        }
    };

    const mostrarModal = (mensaje, tipo = 'success') => {
        setModalMensaje(mensaje);
        setModalTipo(tipo);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValid) {
            mostrarModal('Por favor, completa la verificación.', 'danger');
            return;
        }
        if (!validarEmail(email)) {
            setEmailError('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            mostrarModal('Registro exitoso. Redirigiendo al login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            mostrarModal(err.response?.data?.error || 'Error al registrar el usuario', 'danger');
        }
    };

    const handleInputChange = (e) => {
        if (e.target.id === 'name') setName(e.target.value);
        if (e.target.id === 'email') setEmail(e.target.value);
        if (e.target.id === 'password') setPassword(e.target.value);

        if (name && email && password) {
            setShowCaptcha(true);
        } else {
            setShowCaptcha(false);
        }
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        if (validarEmail(emailValue)) {
            setEmailError('');
        } else {
            setEmailError('Por favor, ingresa un correo electrónico válido.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: '400px' }}>
                <h2 className="card-title text-center mb-4">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Ingresa tu nombre"
                            value={name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {showCaptcha && (
                        <Captcha
                            num1={num1}
                            num2={num2}
                            captchaAnswer={captchaAnswer}
                            setCaptchaAnswer={setCaptchaAnswer}
                            verificarCaptcha={verificarCaptcha}
                            captchaValid={captchaValid}
                        />
                    )}

                    <button type="submit" className="btn btn-primary w-100" disabled={!captchaValid}>
                        Registrarse
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <Link to="/login" className="text-decoration-none">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </div>
            </div>

            <ModalNotificacion
                show={showModal}
                onClose={() => setShowModal(false)}
                mensaje={modalMensaje}
                tipo={modalTipo}
            />
        </div>
    );
};

export default Register;