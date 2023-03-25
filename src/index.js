import './css/styles.css';
import CountryCardTpl from './small-country.hbs';
import CountryDetailTpI from './country.hbs';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const Handlebars = require('handlebars');
Handlebars.registerHelper('GOL', value => {
  const lang = Object.values(value);
  return lang;
});

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(e) {
  let inputCountry = e.target.value.trim();
  if (inputCountry === '') {
    return;
  }

  hideCountryDetail();
  hideCountriesList();

  fetchCountries(inputCountry)
    .then(countries => {
      if (countries.length === 0) {
        showError();
      } else if (countries.length === 1) {
        renderDetailCountryCard(countries);
      } else if (countries.length <= 10 && countries.length > 1) {
        renderSmallCountryCards(countries);
      } else if (countries.length > 10) {
        showMessage();
      }
    })
    .catch(console.error);
}
function renderSmallCountryCards(data) {
  data.forEach(country => {
    const markup = CountryCardTpl(country);
    refs.list.innerHTML += markup;
  });
}
function renderDetailCountryCard([data]) {
  const markup = CountryDetailTpI(data);
  refs.list.innerHTML = markup;
}
function hideCountriesList() {
  refs.list.innerHTML = '';
}
function hideCountryDetail() {
  refs.list.innerHTML = '';
}
function showError() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    timeout: 700,
  });
}
function showMessage() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
    {
      timeout: 700,
    }
  );
}
