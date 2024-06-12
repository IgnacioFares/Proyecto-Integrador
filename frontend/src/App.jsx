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
import Favorites from "./pages/Favorites/Favorites"; // Importa tu componente de favoritos
import Detail from "./Components/Detail/Detail";

import ProductManagement from "./Components/ProductManagement/ProductManagement";
import PermissionsManagement from "./Components/PermissionsManagement/PermissionsManagement";
import CategoryManagement from "./Components/CategoryManagement/CategoryManagement";
import FeaturesManagement from "./Components/FeaturesManagement/FeaturesManagement";
import MisReservas from "./Components/ReservarCancha/MisReservas";
import { AuthProvider } from './context/AuthContext'; // Importación correcta
import SearchResults from "./pages/Resultados/SearchResults";


function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    console.log("Adding to favorites", product);
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product) => {
    console.log("Removing from favorites", product);
    setFavorites(favorites.filter(fav => fav.id !== product.id));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.Reservas} element={<Reservas />} />
            <Route path={routes.productList} element={<ProductList />} />
            <Route path={routes.resultados} element={<SearchResults />}/>
            <Route path="/detalle/:id" element={<Detail />} />
            <Route path="/MisReservas" element={<MisReservas/>}/>
            <Route path="/favoritos" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
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
