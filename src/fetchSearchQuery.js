const API_KEY = '31315876-ebaad9cfb6f2dd991d80baf37';
const baseUrl = '';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  };

  fetchSearchQuery() {
       return axios(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo`
    );    
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery=newQuery
  }
}

// export { NewsApiService };
