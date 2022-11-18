import './css/styles.css';
import NewsApiService from './newsApiService';
import axios from 'axios';
import Notiflix from 'notiflix';

const formSubmitRefs = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const cardRefs = document.querySelectorAll('.photo-card');
const newsApiService = new NewsApiService();

formSubmitRefs.addEventListener('submit', onClickSearchBtn);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('visually-hidden');

function onClickSearchBtn(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();

  newsApiService
    .fetchSearchQuery()
    .then(data => {
      if (data.total !== 0) {
        clearContainer();
        renderQueryCards(data);
        Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtn.classList.add('visually-hidden');
      }
    })
    .catch(error => console.log(error));
}

function renderQueryCards({ hits }) {
  const markup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width ="340 px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  articlesContainer.insertAdjacentHTML('beforeEnd', markup);
}

function onLoadMore() {
  newsApiService.fetchSearchQuery().then(data => {
    renderQueryCards(data);
    if (articlesContainer.children.length >= data.totalHits) {
      Notiflix.Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
      loadMoreBtn.classList.add('visually-hidden');
    }
  });
}

function clearContainer() {
  articlesContainer.innerHTML = '';
}
