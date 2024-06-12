import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes/routes";
import { Layout } from "./Layout/Layout";
import FormularioRegistro from "./pages/FormularioRegistro/FormularioRegistro";
import Reservas from "./pages/Reservas/Reservas";
import Administracion from "./pages/Administracion/Administracion";
import Login from "./pages/Login/Login";
import ProductList from "./pages/ProductList/ProductList";
import ProductManagement from "./Components/ProductManagement.jsx/ProductManagement";
import PermissionsManagement from "./Components/PermissiosnsManagement.jsx/PermissionsManagement";
import Detail from "./Components/Detail/Detail";
import MisReservas from "./Components/ReservarCancha/MisReservas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.Reservas} element={<Reservas/>}/>
          <Route path={routes.productList} element={<ProductList />}/>
          <Route path="/detalle/:id" element={<Detail/>}/>
          <Route path="/MisReservas" element={<MisReservas/>}/>
        </Route>
        <Route path={routes.Login} element={<Login/>}/>
        <Route path="*" element={<h1>404 not found</h1>} />
        <Route path={routes.Register} element={<FormularioRegistro/>}/>
        <Route path={routes.dministracion} element={<Administracion />}>
          <Route path={routes.productos} element={<ProductManagement />} />
          <Route path={routes.permisos} element={<PermissionsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
