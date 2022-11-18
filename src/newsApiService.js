const baseUrl = '';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;    
  }

  fetchSearchQuery() {
    const API_KEY= '31315876-ebaad9cfb6f2dd991d80baf37';
    return fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    )
    .then(r=>r.json())

     .then(data => {
      this.incrementPage();
      return data;
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


