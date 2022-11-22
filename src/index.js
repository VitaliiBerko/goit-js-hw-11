import './css/styles.css';
import NewsApiService from './newsApiService';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSubmitRefs = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();

formSubmitRefs.addEventListener('submit', onClickSearchBtn);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('visually-hidden');

const lightBox = new SimpleLightbox('.gallery a');
lightBox.on('show.simplelightbox');
lightBox.refresh();



async function onClickSearchBtn(e) {
  try {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();

    const response = await newsApiService.fetchSearchQuery();
    if (response.total !== 0) {
      clearContainer();
      renderQueryCards(response);
      Notiflix.Notify.info(`"Hooray! We found ${response.totalHits} images."`);
      loadMoreBtn.classList.remove('visually-hidden');
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('visually-hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

function renderQueryCards({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
      <a href="${webformatURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width ="340 px"/></a>  
  
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
      }
    )
    .join('');

  articlesContainer.insertAdjacentHTML('beforeEnd', markup);
}

async function onLoadMore() {
  const response = await newsApiService.fetchSearchQuery();
  renderQueryCards(response);
  if (articlesContainer.children.length >= response.totalHits) {
    Notiflix.Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
    loadMoreBtn.classList.add('visually-hidden');
  }
}

function clearContainer() {
  articlesContainer.innerHTML = '';
}
