import axios from 'axios';

export default axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: { api_key: '7c12a0af6455a8482b81067977d4503e' }
});
