import ArticleTpI from './article.hbs';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.get('/users').then(res => {
  console.log(res.data);
});

// const Handlebars = require('handlebars');
// Handlebars.registerHelper('GOL', value => {
//   const lang = Object.values(value);
//   return lang;
// });
