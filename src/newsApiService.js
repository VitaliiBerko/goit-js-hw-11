import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  
  async fetchSearchQuery() {
    const API_KEY = '31315876-ebaad9cfb6f2dd991d80baf37';

    const response = await axios(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    const result = await response.data;
    this.incrementPage();
    return result;
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
