import './css/styles.css';
import NewsApiService from './newsApiService';
import axios from 'axios';
import Notiflix from 'notiflix';

const formSubmitRefs = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();




console.log(formSubmitRefs);

formSubmitRefs.addEventListener('submit', onClickSearchBtn);
loadMoreBtn.addEventListener('click', onLoadMore);


function onClickSearchBtn(e) {
  e.preventDefault();
   newsApiService.query= e.currentTarget.elements.searchQuery.value;
   newsApiService.resetPage();
  console.log(newsApiService.query);

  newsApiService.fetchSearchQuery().then(renderQueryCards);
}

function renderQueryCards(hits) {
  const markup = hits.map(({webformatURL, tags, likes, views, comments, downloads}) => {

      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  articlesContainer.insertAdjacentHTML('afterbegin', markup);
}

function onLoadMore () {
   newsApiService.fetchSearchQuery()
   .then(renderQueryCards)
    
}