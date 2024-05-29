import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const FormularioRegistro = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombreCompleto: "",
    correo: "",
    confirmarCorreo: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!/^[a-zA-Z\s]+$/.test(datosFormulario.nombreCompleto)) {
      nuevosErrores.nombreCompleto =
        "El nombre completo no debe contener números.";
    }

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(datosFormulario.correo)) {
      nuevosErrores.correo = "El correo no es válido.";
    } else if (datosFormulario.correo !== datosFormulario.confirmarCorreo) {
      nuevosErrores.confirmarCorreo = "Los correos no coinciden.";
    }

    const patronTelefono = /^[0-9]+$/;
    if (!patronTelefono.test(datosFormulario.telefono)) {
      nuevosErrores.telefono =
        "El número de teléfono solo debe contener dígitos.";
    }

    if (datosFormulario.contraseña !== datosFormulario.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden.";
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
      console.log("Formulario enviado", datosFormulario);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <img src="/images/logosolo1.png" alt="Logo" />
      <h1 className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-2xl font-bold my-4">
        Crear cuenta
      </h1>
      <form className="w-full max-w-sm" onSubmit={manejarEnvio}>
        <div className="mb-4">
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            placeholder="Nombre completo"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.nombreCompleto}
            onChange={manejarCambio}
          />
          {errores.nombreCompleto && (
            <p className="text-red-500 text-sm mt-1">
              {errores.nombreCompleto}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Correo"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.correo}
            onChange={manejarCambio}
          />
          {errores.correo && (
            <p className="text-red-500 text-sm mt-1">{errores.correo}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="confirmarCorreo"
            name="confirmarCorreo"
            placeholder="Confirmar correo"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.confirmarCorreo}
            onChange={manejarCambio}
          />
          {errores.confirmarCorreo && (
            <p className="text-red-500 text-sm mt-1">
              {errores.confirmarCorreo}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Número de teléfono"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.telefono}
            onChange={manejarCambio}
          />
          {errores.telefono && (
            <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            placeholder="Contraseña"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.contraseña}
            onChange={manejarCambio}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="confirmarContraseña"
            name="confirmarContraseña"
            placeholder="Confirmar contraseña"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.confirmarContraseña}
            onChange={manejarCambio}
          />
          {errores.confirmarContraseña && (
            <p className="text-red-500 text-sm mt-1">
              {errores.confirmarContraseña}
            </p>
          )}
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
          <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Ingresar con
          Google
        </button>
        <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl">
          <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Ingresar con
          Facebook
        </button>
        <button className="flex items-center bg-white border border-black text-black font-bold py-2 px-6 rounded mb-2 w-full max-w-xl">
          <FontAwesomeIcon icon={faApple} className="mr-2" /> Ingresar con Apple
        </button>
      </div>
      <p className="mt-4"> ¿Ya tienes una cuenta?<Link to={routes.Login} className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300"> Iniciar sesión</Link></p>
    </div>
  );
};

export default FormularioRegistro;
