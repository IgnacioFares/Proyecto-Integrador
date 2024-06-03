// URL del endpoint
const url = 'http://localhost:8080/login';

// Realizar la solicitud GET
fetch(url)
  .then(response => {
    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    // Convertir la respuesta a JSON
    return response.json();
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos
    console.log(data);
  })
  .catch(error => {
    // Manejo de errores
    console.error('There has been a problem with your fetch operation:', error);
  });