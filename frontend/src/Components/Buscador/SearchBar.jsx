import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest';
import axios from '../../axiosConfig';
import { FaSearch, FaCalendarAlt, FaArrowRight, FaClock } from 'react-icons/fa';

const searchSuggestions = [
  'Buenos Aires', 'Cordoba', 'Mar del Plata', 'Rosario', 'Mendoza', 'La Plata', 'San Miguel de Tucumán', 'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Corrientes', 'Bahia Blanca', 'Posadas', 'Neuquen', 'Formosa', 'Santiago del Estero', 'Parana', 'Rio Cuarto', 'Comodoro Rivadavia'
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locations, setLocations] = useState([]);
  const [time, setTime] = useState(null);

  const timePickerRef = useRef(null);
  const datePickerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/ubicaciones').then(response => response.data);
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
        const response = await axios.get('/categorias');
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
      const response = await axios.get('/search', {
        params: {
          searchTerm: searchTerm,
          category: selectedCategory,
          date: date ? date.toISOString() : null,
          time: time ? time.toISOString() : null
        }
      });

      navigate('/resultados', { state: { results: response.data } });
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div className="mt-6 flex justify-center items-center">
    <div className="p-4 lg:p-6 bg-white lg:rounded-full rounded-md shadow-2xl flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 relative w-full lg:w-auto">
      <div className="block lg:hidden text-center text-lg font-semibold text-green-500 mb-2 w-full">Buscador de Canchas</div>
      <div className="flex items-center space-x-2 bg-green-500 text-gray-700 rounded-md lg:rounded-full border-1 py-0.5 pl-3 pr-0.5 relative w-full lg:w-auto text-sm">
        <FaSearch className="text-white" />
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
            className: 'p-1 lg:p-2 bg-white text-gray-700 border-5 rounded-full w-full lg:w-auto text-sm',
          }}
          theme={{
            container: 'relative w-full lg:w-auto',
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
        className="p-1 lg:p-2 bg-white text-gray-500 border-2 border-green-500 rounded-md lg:rounded-full w-full lg:w-auto text-sm"
      >
        <option value="">Categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.nombre}>
            {category.nombre}
          </option>
        ))}
      </select>
      <div className="flex items-center space-x-2 w-full lg:w-auto">
        <div onClick={() => datePickerRef.current.setOpen(true)} className="cursor-pointer">
          <FaCalendarAlt className="text-green-500" />
        </div>
        <DatePicker
          ref={datePickerRef}
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Fecha"
          minDate={new Date()} // Establece la fecha mínima a hoy
          className="p-1 lg:p-2 bg-white text-gray-700 border-2 border-green-500 rounded-md lg:rounded-full w-full lg:w-auto text-sm"
        />
      </div>
      <div className="flex items-center space-x-2 w-full lg:w-auto">
        <div onClick={() => timePickerRef.current.setOpen(true)} className="cursor-pointer">
          <FaClock className="text-green-500" />
        </div>
        <DatePicker
          selected={time}
          onChange={(time) => setTime(time)}
          placeholderText="Horario"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Horario"
          dateFormat="h:mm aa"
          ref={timePickerRef}
          className="p-1 lg:p-2 bg-white text-gray-700 border-2 border-green-500 rounded-md lg:rounded-full w-full lg:w-auto text-sm"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white py-2 px-4 rounded-md lg:rounded-full flex items-center hover:bg-green-700 transition duration-200 w-full lg:w-auto text-sm"
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