import { useState } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';

const FormularioRegistro = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    numeroTelefono: ""
  });

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosFormulario.nombre) {
      nuevosErrores.nombre = "El nombre es requerido.";
    }
    if (!datosFormulario.apellido) {
      nuevosErrores.apellido = "El apellido es requerido.";
    }
    if (!datosFormulario.email) {
      nuevosErrores.email = "El email es requerido.";
    }
    if (!datosFormulario.password) {
      nuevosErrores.password = "La contraseña es requerida.";
    }
    if (!datosFormulario.numeroTelefono) {
      nuevosErrores.numeroTelefono = "El número de teléfono es requerido.";
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

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        await axios.post('/register', datosFormulario);// Redirigir a la página de login después del registro
        navigate(routes.Login)
      } catch (error) {
        console.error('Error durante el registro:', error);
        setErrores({ formulario: 'Error durante el registro. Por favor, intente nuevamente.' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-2xl font-bold my-4">
        Registro
      </h1>
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
          {errores.nombre && (
            <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
          )}
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
          {errores.apellido && (
            <p className="text-red-500 text-sm mt-1">{errores.apellido}</p>
          )}
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

        <div className="mb-4">
          <input
            type="text"
            id="numeroTelefono"
            name="numeroTelefono"
            placeholder="Número de Teléfono"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={datosFormulario.numeroTelefono}
            onChange={manejarCambio}
          />
          {errores.numeroTelefono && (
            <p className="text-red-500 text-sm mt-1">{errores.numeroTelefono}</p>
          )}
        </div>

        {errores.formulario && (
          <p className="text-red-500 text-sm mb-4">{errores.formulario}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 via-green-500 to-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
