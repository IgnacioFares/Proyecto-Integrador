<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes/routes";
import { Layout } from "./Layout/Layout";
import FormularioRegistro from "./pages/FormularioRegistro/FormularioRegistro";
import Reservas from "./pages/Reservas/Reservas";
import Administracion from "./pages/Administracion/Administracion";
import Login from "./pages/Login/Login";


=======
import Footer from './Components/Footer/Footer';
import Calificacion from './Components/Calificacion/Calificacion'
import Preguntas from './Preguntas/Preguntas';
import Reservas from './Components/Reservas/Reservas';
import FormularioRegistroAdmin from './Components/FormularioRegistroAdmin/FormularioRegistroAdmin';
>>>>>>> 5d7204a33b15d3a728db1cd0757f4161257be8fa



function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>

          <Route path={routes.home} element={<Home />} />
          <Route path={routes.Reservas} element={<Reservas/>}/>
          
        </Route>
        <Route path={routes.Login} element={<Login/>}/>
        <Route path="*" element={<h1>404 not found</h1>} />
        <Route path={routes.Register} element={<FormularioRegistro/>}/>
        <Route path={routes.Administracion} element={<Administracion/>}/>

      </Routes>
    </BrowserRouter>
  );
=======
    <div>
        <FormularioRegistroAdmin/>
        <Footer/>
    </div>
  )
>>>>>>> 5d7204a33b15d3a728db1cd0757f4161257be8fa
}

export default App;
