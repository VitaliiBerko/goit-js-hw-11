import './css/styles.css';
import NewsApiService from './fetchSearchQuery';
import axios from 'axios';
import Notiflix from 'notiflix';

const formSubmitRefs = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();
// loadMoreBtn.disabled = true;

console.log(formSubmitRefs);

formSubmitRefs.addEventListener('submit', onClickSearchBtn);
// loadMoreBtn.addEventListener('click', onLoadMore);

function onClickSearchBtn(e) {
  e.preventDefault();
   newsApiService.query= e.currentTarget.elements.searchQuery.value;
  console.log(newsApiService.query);

  newsApiService.fetchSearchQuery().then(renderQueryCards);
}

function renderQueryCards(querys) {
  const markup = querys
    .map(({ hits }) => {

      return `<div class="photo-card">
  <img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${hits.likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  articlesContainer.insertAdjacentHTML('afterbegin', markup);
}

function onLoadMore () {
    newsApiService.fetchSearchQuery(searchQuery)
}