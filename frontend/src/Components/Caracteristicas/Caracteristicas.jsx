const Caracteristicas = ({ caracteristicas }) => {
  return (
    <div className="border-t border-gray-200 mt-4 pt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Características del Lugar</h3>
      <div className="grid grid-cols-2 gap-4">
        {caracteristicas.map((feature) => (
          <div key={feature.id} className="flex items-center">
            <img src={feature.logoUrl} alt={feature.nombre} className="w-6 h-6 mr-2" />
            <span className="text-sm text-gray-700">{feature.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Caracteristicas;
