import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const FormularioRegistro = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <img src="/images/logosolo1.png" alt="Logo" />
            <h1 className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-2xl font-bold my-4">Crear cuenta</h1>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <input type="email" id="email" name="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                    <input type="password" id="password" name="password" placeholder="Contraseña" className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña" className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-green-500 via-green-500 to-blue-700 text-white font-bold py-2 px-4 rounded">Crear cuenta</button>
            </form>
            <hr className="w-full my-4" />
            <div className="flex flex-col items-center">
    <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl"><FontAwesomeIcon icon={faGoogle} className="mr-2" /> Ingresar con Google</button>
    <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl"><FontAwesomeIcon icon={faFacebook} className="mr-2" /> Ingresar con Facebook</button>
    <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl"><FontAwesomeIcon icon={faApple} className="mr-2" /> Ingresar con Apple</button>
</div>





            <p className="mt-4">¿Ya tienes una cuenta? <a href="#" className="text-blue-500">Iniciar sesión</a></p>
        </div>
    );
}

export default FormularioRegistro;
