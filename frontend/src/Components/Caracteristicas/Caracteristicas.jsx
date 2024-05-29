const Caracteristicas = () => {
    const features = [
      { caracteristica: 'Pasto Real', icon: '🅿️' }, 
      { caracteristica: 'Iluminacion', icon: '🅿️' }, 
      { caracteristica: 'Estacionamiento gratuito', icon: '🅿️' }, 
      { caracteristica: 'Graderias', icon: '🅿️' }, 
      { caracteristica: 'Superficie Nivelada', icon: '🅿️' },
      { caracteristica: 'Camaras de Seguridad', icon: '🅿️' }
    ];
  
    return (
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">¿Caracteristicas del Lugar?</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="text-xl mr-2">{feature.icon}</div>
              <span className="text-sm text-gray-700">{feature.caracteristica}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Caracteristicas;