import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest';
import axios from '../../axiosConfig';
import { FaSearch, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const searchSuggestions = [
  'Buenos Aires', 'Cordoba', 'Mar del Plata', 'Rosario'
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Crear referencias para los DatePicker
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

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

    return inputLength === 0 ? [] : searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const handleSearch = () => {

    //Aqui tenemos que diseñar la logica de como se va a realizar la busqueda. 
    console.log('Buscando:', searchTerm, selectedCategory, startDate, endDate);
  };

  return (
    <div className="mt-5 flex justify-center items-center ">
      <div className="p-6 bg-white rounded-full shadow-md flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-green-500 text-white rounded-full border-1 py-0.5 pl-3 pr-0.5">
          <FaSearch />
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
              className: 'p-2 bg-white text-gray-700 border-none rounded-full'
            }}
            theme={{
              input: 'p-2 border-none rounded-full outline-none'
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
            <option key={category.id} value={category.name}>
              {category.name}
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




