import AdminHeader from "../Components/AdminHeader"
import ProductsTable from "../Components/ProductsTable"
import Sidebar from "../Components/Sidebar"
import { useState, useEffect } from "react"


const Administracion = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Check initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">No disponible en dispositivos móviles</h1>
          <p>Por favor, accede desde un dispositivo con una pantalla más grande.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <AdminHeader/>
        <div className="p-4">
          <ProductsTable/>
        </div>
      </div>
    </div>
  )
}

export default Administracion