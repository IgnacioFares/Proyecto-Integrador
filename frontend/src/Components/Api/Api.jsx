import axios from 'axios';

// para pegarle a la api necesita 3 parametros
// el tipo de  peticion (GET,POST,PUT,DELETE...)
// el endpoint a cual pegarle y el array que recibe en el caso que sea un post 
export const Api = ( tipo, endpoint, data ) => {
  const localHost = "http://localhost:8080/";
  const response = tipo == 'GET' ? axios.get(localHost + endpoint) : axios.post(localHost + endpoint, data);
  return response.data;
}
export default Api;