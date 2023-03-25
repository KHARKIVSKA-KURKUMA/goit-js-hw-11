async function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const response = await fetch(`${BASE_URL}/name/${name}`);
  return response.json();
}

// function fetchCountries(name) {
//   return fetch(`${BASE_URL}/name/${name}`).then(response =>
//     response.json()
//   );
// }

export { fetchCountries };
