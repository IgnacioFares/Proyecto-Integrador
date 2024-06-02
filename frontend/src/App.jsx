import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import PermissionsManagement from './pages/PermissionsManagement';
import Administracion from './pages/Administracion';
import ProductManagement from './pages/ProductManagement';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import CategoryManagement from './pages/CategoryManagement';
import FeatureManagement from './pages/FeaturesManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.productList} element={<><Header /><ProductList /></>} />
        <Route path={routes.administracion} element={<Administracion />}>
          <Route path={routes.productos} element={<ProductManagement />} />
          <Route path={routes.permisos} element={<PermissionsManagement />} />
          <Route path={routes.categorias} element={<CategoryManagement/>} />
          <Route path={routes.caracteristicas} element={<FeatureManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




