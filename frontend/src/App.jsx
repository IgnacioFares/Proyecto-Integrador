<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes/routes";
import { Layout } from "./Layout/Layout";
import FormularioRegistro from "./pages/FormularioRegistro/FormularioRegistro";
import Reservas from "./pages/Reservas/Reservas";
import Administracion from "./pages/Administracion/Administracion";
import Login from "./pages/Login/Login";
import ProductList from "./pages/ProductList/ProductList";

import ProductManagement from "./Components/ProductManagement/ProductManagement";
import PermissionsManagement from "./Components/PermissionsManagement/PermissionsManagement";
import Detail from "./Components/Detail/Detail";
import CategoryManagement from "./Components/CategoryManagement/CategoryManagement";
import FeaturesManagement from "./Components/FeaturesManagement/FeaturesManagement";

<<<<<<< HEAD
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
=======
import { AuthProvider } from './context/AuthContext'; // Importación correcta

function App() {
>>>>>>> FernandoMercyFull

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.Reservas} element={<Reservas />} />
            <Route path={routes.productList} element={<ProductList />} />
            <Route path="/detalle/:id" element={<Detail />} />
          </Route>
          <Route path={routes.Login} element={<Login />} />
          <Route path="*" element={<h1>404 not found</h1>} />
          <Route path={routes.Register} element={<FormularioRegistro />} />
          <Route path={routes.administracion} element={<Administracion />}>
            <Route path={routes.productos} element={<ProductManagement />} />
            <Route path={routes.permisos} element={<PermissionsManagement />} />
            <Route path={routes.categorias} element={<CategoryManagement />} />
            <Route path={routes.caracteristicas} element={<FeaturesManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
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
