import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { routes } from "./routes/routes";
import { Layout } from "./Layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>

          <Route path={routes.home} element={<Home />} />


        </Route>
        <Route path="*" element={<h1>404 not found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
