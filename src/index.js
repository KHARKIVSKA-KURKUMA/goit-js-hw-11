import ArticleTpI from './article.hbs';
import Notiflix from 'notiflix';
import { fetchImage } from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  inp: document.querySelector('.search-form'),
  btn: document.querySelector('.load-more'),
};

refs.btn.disabled = false;
let searchQuery = '';
let currentPage = 1;
let currentHits = 0;

refs.inp.addEventListener('submit', onSubmitSearch);
refs.btn.addEventListener('click', onClickLoadMore);

function renderCardImage(data) {
  const markup = data.map(item => ArticleTpI(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

async function onSubmitSearch(e) {
  e.preventDefault();
  currentPage = 1;
  searchQuery = e.currentTarget.searchQuery.value;
  if (searchQuery === '') {
    return;
  }
  const response = await fetchImage(searchQuery, currentPage);
  currentHits = response.hits.length;
  if (response.totalHits > 40) {
    refs.btn.disabled = false;
  } else {
    refs.btn.disabled = true;
  }
  try {
    if (response.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.gallery.innerHTML = '';
      renderCardImage(response.hits);
      lightbox.refresh();
    }
    if (response.totalHits === 0) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btn.disabled = true;
    }
  } catch (error) {
    console.log(error);
  }
}

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 200,
});

async function onClickLoadMore() {
  currentPage += 1;
  const res = await fetchImage(searchQuery, currentPage);
  renderCardImage(res.hits);
  lightbox.refresh();
  currentHits += res.hits.length;
  console.log(currentHits);
  console.log(res.totalHits);
  if (currentHits === res.totalHits) {
    refs.btn.disabled = true;
  }
}
