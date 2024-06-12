import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest';
import axios from '../../axiosConfig';
import { FaSearch, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const searchSuggestions = [
  'Buenos Aires', 'Cordoba', 'Mar del Plata', 'Rosario', 'Mendoza', 'La Plata', 'San Miguel de Tucumán', 'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Corrientes', 'Bahia Blanca', 'Posadas', 'Neuquen', 'Formosa', 'Santiago del Estero', 'Parana', 'Rio Cuarto', 'Comodoro Rivadavia'
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locations, setLocations] = useState([]);

  // Crear referencias para los DatePicker
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/ubicaciones').then(response => {return response.data});
        setLocations(response);
      } catch (error) {
        console.error('Error al cargar las ubicaciones :(', error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/administracion/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al cargar las categorías.');
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    return locations
      .filter(location => location.ciudad.toLowerCase().includes(inputValue))
      .map(location => location.ciudad);

  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="relative">
      <div className="py-1 px-3 bg-white border border-gray-300 rounded-md shadow-lg">
        {suggestion}
      </div>
    </div>
  );

  const handleSearch = async () => {
    try {
      // Realizar la búsqueda en el backend utilizando los criterios de búsqueda
      const response = await axios.get('/buscar', {
        params: {
          searchTerm: searchTerm,
          category: selectedCategory,
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null
        }
      });
  
      // Redirigir a la página de resultados de búsqueda con los datos
      navigate('/resultados', { state: { results: response.data } });
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div className="mt-6 flex justify-center items-center">
      <div className="p-6 bg-white rounded-full shadow-2xl flex items-center space-x-4 relative">
        <div className="flex items-center space-x-2 bg-green-500 text-gray-700 rounded-full border-1 py-0.5 pl-3 pr-0.5 relative">
          <FaSearch className="text-white"/>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Ciudad...',
              value: searchTerm,
              onChange: handleSearchChange,
              className: 'p-2 bg-white text-gray-700 border-5 rounded-full'
            }}
            theme={{
              container: 'relative',
              suggestionsContainer: 'absolute z-10 w-full mt-1',
              suggestionsList: 'bg-white border border-gray-300 rounded-md shadow-lg',
              suggestion: 'py-1 px-3',
              suggestionHighlighted: 'bg-gray-200',
            }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 bg-white text-gray-500 border-2 border-green-500 rounded-full"
        >
          <option value="">Categoría</option>
          {categories.map(category => (
            <option key={category.id} value={category.nombre}>
              {category.nombre}
            </option>
          ))}
        </select>
        <div className="flex items-center space-x-2">
          <div onClick={() => startDatePickerRef.current.setOpen(true)} className="cursor-pointer">
            <FaCalendarAlt className="text-green-500" />
          </div>
          <DatePicker
            ref={startDatePickerRef}
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha inicio"
            className="p-2 bg-white text-gray-700 border-2 border-green-500 rounded-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div onClick={() => endDatePickerRef.current.setOpen(true)} className="cursor-pointer">
            <FaCalendarAlt className="text-green-500" />
          </div>
          <DatePicker
            ref={endDatePickerRef}
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha fin"
            className="p-2 bg-white text-gray-700 border-2 border-green-500 rounded-full"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-700 transition duration-200"
        >
          Buscar
          <div className="bg-white text-green-500 rounded-full p-2 ml-3 flex items-center justify-center">
            <FaArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;







