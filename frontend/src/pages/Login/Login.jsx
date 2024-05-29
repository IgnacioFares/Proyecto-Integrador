import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const Login = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    correo: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(datosFormulario.correo)) {
      nuevosErrores.correo = "El correo no es válido.";
    }

    if (!datosFormulario.contraseña) {
      nuevosErrores.contraseña = "La contraseña es requerida.";
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
        Iniciar sesión
      </h1>
      <form className="w-full max-w-sm" onSubmit={manejarEnvio}>
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
            type="password"
            id="contraseña"
            name="contraseña"
            placeholder="Contraseña"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.contraseña}
            onChange={manejarCambio}
          />
          {errores.contraseña && (
            <p className="text-red-500 text-sm mt-1">{errores.contraseña}</p>
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
