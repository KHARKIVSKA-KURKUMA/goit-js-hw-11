import axios from 'axios';

async function fetchImage(q, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '34885116-6d9c2e4d5b1555007e59a700b';
  const filter =
    'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
  const response = await axios
    .get(`${BASE_URL}?key=${KEY}&q=${q}&${filter}&page=${page}`)
    .then(r => r.data);
  return response;
}
export { fetchImage };
