import ArticleTpI from './article.hbs';
import Notiflix from 'notiflix';
import { fetchImage } from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
};

refs.loadMore.classList.add('is-hidden');
let currentValue = '';
let pages = 1;
let currentHits = 0;
let secondRequest = false;
let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onClickLoadMore);

async function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.searchQuery.value.trim();
  if (searchQuery === '') {
    refs.gallery.innerHTML = '';
    secondRequest = false;
    pages = 1;
    refs.loadMore.classList.add('is-hidden');
    alertNoEmptySearch();
    return;
  }
  if (searchQuery !== currentValue) {
    refs.loadMore.classList.add('is-hidden');
    currentValue = searchQuery;
    pages = 1;
    refs.gallery.innerHTML = '';
    secondRequest = false;
  }
  onClickLoadMore();
}

async function onClickLoadMore() {
  refs.loadMore.classList.add('is-hidden');
  const response = await fetchImage(currentValue, pages);
  const { hits, total } = response;
  currentHits = hits.length;

  if (currentHits > 0) {
    refs.loadMore.classList.remove('is-hidden');
    renderCardImage(hits);
    lightbox.refresh();
    if (pages === 1) {
      alertImagesFound(total);
    }
    pages += 1;
  }
  if (currentHits === 0) {
    if (pages === 1) {
      alertNoImagesFound();
    }
    if (pages > 1 && secondRequest === false) {
      alertEndOfSearch();
      secondRequest = true;
    }
  }
}

function renderCardImage(data) {
  const markup = data.map(item => ArticleTpI(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function alertImagesFound(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}
