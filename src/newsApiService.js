const baseUrl = '';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.API_KEY = '31315876-ebaad9cfb6f2dd991d80baf37';
  }

  fetchSearchQuery() {
    return fetch(
      `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}`
    )
    .then(r=>r.json())
    .then(data => {
      this.incrementPage();
      return data.hits;
    });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export { NewsApiService };
