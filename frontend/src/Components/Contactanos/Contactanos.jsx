import React from "react";

const Contactanos = () => {
  return (
    <section className="w-full mt-16 px-4 md:px-0">
      <div className="flex justify-center mb-4">
        <p className="text-center">Reserva tu cancha de fútbol ahora mismo</p>
      </div>

      <div className="flex justify-center mb-4">
        <h3 className="text-center text-3xl md:text-4xl font-bold text-green-500 mb-2">
          Contáctanos hoy
        </h3>
      </div>

      <div className="flex justify-center mb-4 text-center">
        Estamos aquí para ayudarte
      </div>

      <article className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-center flex-col items-center bg-gray-100 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            className="text-green-500 mb-2"
          >
            <path
              fill="#65a30d"
              d="M2 20V4h20v16zm10-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"
            />
          </svg>

          <h3 className="text-lg md:text-xl text-green-500 mb-1">Correo electrónico</h3>
          <p className="text-sm md:text-base">santicai@gmail.com</p>
        </div>

        <div className="flex justify-center flex-col items-center bg-gray-100 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 20 20"
            className="text-blue-500 mb-2"
          >
            <path
              fill="#5E6FAB"
              d="m6.987 2.066l-.717.216a3.5 3.5 0 0 0-2.454 2.854c-.297 2.068.367 4.486 1.968 7.259c1.597 2.766 3.355 4.548 5.29 5.328a3.5 3.5 0 0 0 3.715-.705l.542-.514a2 2 0 0 0 .247-2.623l-1.356-1.88a1.5 1.5 0 0 0-1.655-.556l-2.051.627l-.053.01c-.226.033-.748-.456-1.398-1.582c-.68-1.178-.82-1.867-.633-2.045l1.043-.973a2.5 2.5 0 0 0 .575-2.85l-.662-1.471a2 2 0 0 0-2.4-1.095m1.49 1.505l.66 1.471a1.5 1.5 0 0 1-.344 1.71l-1.046.974C7.078 8.36 7.3 9.442 8.2 11c.846 1.466 1.618 2.19 2.448 2.064l.124-.026l2.088-.637a.5.5 0 0 1 .552.185l1.356 1.88a1 1 0 0 1-.123 1.312l-.543.514a2.5 2.5 0 0 1-2.653.503c-1.698-.684-3.303-2.311-4.798-4.9C5.152 9.3 4.545 7.093 4.806 5.278a2.5 2.5 0 0 1 1.753-2.039l.717-.216a1 1 0 0 1 1.2.548"
            />
          </svg>

          <h3 className="text-lg md:text-xl text-blue-500 mb-1">Teléfono</h3>
          <p className="text-sm md:text-base">+35164859837</p>
        </div>

        <div className="flex justify-center flex-col items-center bg-gray-100 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 320 488"
            className="text-green-500 mb-2"
          >
            <path
              fill="#65a30d"
              d="M311 116q-1-3-3.5-9.5T304 98q-21-49-61.5-72.5T158 2Q101 2 55 39.5T1 145v19l1 5v7q2 16 10.5 36.5t15.5 33t22.5 38T71 317q29 49 89 145q8-13 55-94q2-3 7.5-12t7.5-14q2-3 6.5-8.5t6.5-8.5q7-13 30.5-49.5T308 214t11-49v-22q0-11-8-27m-152 99q-39 0-54-38q-1-5-1-15v-13q0-25 17-38.5T161 97q25 0 41.5 17t16.5 42t-17.5 42t-42.5 17"
              className
            />
          </svg>

          <h3 className="text-lg md:text-xl text-green-500 mb-1">Oficina</h3>
          <p className="text-sm md:text-base">Cba, Cordoba Arg.</p>
        </div>
      </article>
    </section>
  );
};

export default Contactanos;
