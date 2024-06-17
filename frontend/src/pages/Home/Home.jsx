import { Encabezado } from "../../Components/Encabezado/Encabezado";

import Calificacion from "../../Components/Calificacion/Calificacion";
import Preguntas from "../../Components/Preguntas/Preguntas";
import Contactanos from "../../Components/Contactanos/Contactanos";
import { CardContainer } from "../../Components/Cardconteiner/CardCounteiner";

export const Home = () => {
  return (
    <>
      <Encabezado />
      <CardContainer/>
      <Preguntas />
      <Contactanos />
      <Calificacion />
    </>
  );
};
