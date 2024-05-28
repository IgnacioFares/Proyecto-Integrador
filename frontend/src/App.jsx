import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes/routes";
import { Layout } from "./Layout/Layout";
import FormularioRegistro from "./Components/FormularioRegistro/FormularioRegistro";
import Reservas from "./pages/Reservas/Reservas";
import Administracion from "./pages/Administracion/Administracion";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>

          <Route path={routes.home} element={<Home />} />
          <Route path={routes.Reservas} element={<Reservas/>}/>
          
        </Route>

        <Route path="*" element={<h1>404 not found</h1>} />
        <Route path={routes.Login} element={<FormularioRegistro/>}/>
        <Route path={routes.Administracion} element={<Administracion/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
