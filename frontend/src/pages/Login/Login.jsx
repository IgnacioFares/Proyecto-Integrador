import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import Api from "../../Components/Api/Api";
import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext'; 
import { useJwt } from "react-jwt";

const token = 'tu.token.jwt';
const secret = 'tu_llave_secreta';  // La llave secreta usada para firmar el token

const Login = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState('');

  const validarFormulario = () => {
    const nuevosErrores = {};

    const patronemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronemail.test(datosFormulario.email)) {
      nuevosErrores.email = "El email no es válido.";
    }

    if (!datosFormulario.password) {
      nuevosErrores.password = "La contraseña es requerida.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      Api("POST", "login", datosFormulario)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          setMensajeError("Error al iniciar sesión, por favor intente nuevamente.");
          console.error(error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <img src="/images/logosolo1.png" alt="Logo" />
      <h1 className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-2xl font-bold my-4">
        Iniciar sesión
      </h1>
      {mensajeError && <p className="text-red-500">{mensajeError}</p>}
      <form className="w-full max-w-sm" onSubmit={manejarEnvio}>
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
          {errores.email && (
            <p className="text-red-500 text-sm mt-1">{errores.email}</p>
          )}
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
          {errores.password && (
            <p className="text-red-500 text-sm mt-1">{errores.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 via-green-500 to-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar sesión
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
      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link
          to={routes.Register}
          className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
};

export default Login;
