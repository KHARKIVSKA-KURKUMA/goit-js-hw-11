import './css/styles.css';
import CountryCardTpl from './small-country.hbs';
import CountryDetailTpI from './country.hbs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

fetchCountries('United Kingdom')
  .then(renderSmallCountryCard)
  .catch(console.log());

function renderSmallCountryCard([data]) {
  const markup = CountryDetailTpI(data);
  refs.list.innerHTML = markup;
}

/* -------------------------------------------------------------------------- */

// (async () => {
//   try {
//     const [data] = await fetchCountries('United Kingdom');
//     const markup = CountryCardTpl(data);
//     refs.list.innerHTML = markup;
//   } catch (error) {
//     console.log(error);
//   }
// })();
