import { useState } from "react";
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
import MisReservas from "./Components/ReservarCancha/MisReservas";
import { AuthProvider } from './context/AuthContext';
import SearchResults from "./pages/Resultados/SearchResults";
import Favorites from "./pages/Favorites/Favorites";
import About from "./pages/About/About";

function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product) => {
    setFavorites(favorites.filter(fav => fav.id !== product.id));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.Reservas} element={<Reservas />} />
            <Route path={routes.productList} element={
              <ProductList
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites}
              />
            } />
            <Route path={routes.resultados} element={<SearchResults />} />
            <Route path="/detalle/:id" element={
              <Detail
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={favorites}
              />
            } />
            <Route path="/MisReservas" element={<MisReservas />} />
            <Route path="/favoritos" element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            } />
            <Route path={routes.about} element= {<About/>}/>
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
}

export default App;
