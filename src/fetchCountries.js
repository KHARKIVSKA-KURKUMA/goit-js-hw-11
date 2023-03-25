async function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const response = await fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  );
  // console.log(response.json());
  if (!response.ok) {
    return [];
  }
  return response.json();
}
export { fetchCountries };
