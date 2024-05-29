import Api from "../Api/Api" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const FormularioRegistro = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        numeroTelefono: '',
        password: '',
        confirmarpassword: ''
    });

    const [errores, setErrores] = useState({});
    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!/^[a-zA-Z\s]+$/.test(datosFormulario.nombre || !/^[a-zA-Z\s]+$/.test(datosFormulario.apellido))) {
            nuevosErrores.nombre = 'El nombre completo no debe contener números.';
        }

        const patronemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patronemail.test(datosFormulario.email)) {
            nuevosErrores.email = 'El email no es válido.';
        }

        const patronnumeroTelefono = /^[0-9]+$/;
        if (!patronnumeroTelefono.test(datosFormulario.numeroTelefono)) {
            nuevosErrores.numeroTelefono = 'El número de teléfono solo debe contener dígitos.';
        }

        if (datosFormulario.password !== datosFormulario.confirmarpassword) {
            nuevosErrores.confirmarpassword = 'Las passwords no coinciden.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarCambio = (e) => {
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            // console.log('Formulario enviado', datosFormulario);
            console.log(Api("POST","register",datosFormulario));
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <img src="/images/logosolo1.png" alt="Logo" />
            <h1 className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-2xl font-bold my-4">Crear cuenta</h1>
            <form className="w-full max-w-sm" onSubmit={manejarEnvio}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.nombre} 
                        onChange={manejarCambio} 
                    />
                    {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
                </div>

                <div className="mb-4">
                    <input 
                        type="text" 
                        id="apellido" 
                        name="apellido" 
                        placeholder="Apellido" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.apellido} 
                        onChange={manejarCambio} 
                    />
                    {errores.apellido && <p className="text-red-500 text-sm mt-1">{errores.apellido}</p>}
                </div>

                <div className="mb-4">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.email} 
                        onChange={manejarCambio} 
                    />
                    {errores.email && <p className="text-red-500 text-sm mt-1">{errores.email}</p>}
                </div>

                <div className="mb-4">
                    <input 
                        type="text" 
                        id="numeroTelefono" 
                        name="numeroTelefono" 
                        placeholder="Número de teléfono" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.numeroTelefono} 
                        onChange={manejarCambio} 
                    />
                    {errores.numeroTelefono && <p className="text-red-500 text-sm mt-1">{errores.numeroTelefono}</p>}
                </div>

                <div className="mb-4">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.password} 
                        onChange={manejarCambio} 
                    />
                </div>

                <div className="mb-4">
                    <input 
                        type="password" 
                        id="confirmarpassword" 
                        name="confirmarpassword" 
                        placeholder="Confirmar contraseña" 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        value={datosFormulario.confirmarpassword} 
                        onChange={manejarCambio} 
                    />
                    {errores.confirmarpassword && <p className="text-red-500 text-sm mt-1">{errores.confirmarpassword}</p>}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-500 via-green-500 to-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear cuenta
                </button>
            </form>
            <hr className="w-full my-4" />
            <div className="flex flex-col items-center">
                <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl">
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Ingresar con Google
                </button>
                <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl">
                    <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Ingresar con Facebook
                </button>
                <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl">
                    <FontAwesomeIcon icon={faApple} className="mr-2" /> Ingresar con Apple
                </button>
            </div>
            <p className="mt-4">¿Ya tienes una cuenta? <a href="#" className="text-blue-500">Iniciar sesión</a></p>
        </div>
    );
}

export default FormularioRegistro;