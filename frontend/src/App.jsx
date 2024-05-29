import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import PermissionsManagement from './pages/PermissionsManagement';
import Administracion from './pages/Administracion';
import ProductManagement from './pages/ProductManagement';
import ProtectedRoute from './Components/ProtectedRoute';
import Header from './Components/Header';
import ProductList from './Components/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.productList} element={<><Header /><ProductList /></>} />
        <Route path={routes.administracion} element={<ProtectedRoute><Administracion /></ProtectedRoute>}>
          <Route path={routes.productos} element={<ProductManagement />} />
          <Route path={routes.permisos} element={<PermissionsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




