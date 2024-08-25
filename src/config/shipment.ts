import axios from 'axios';

// Create an Axios instance with default configurations
export default axios.create({
  baseURL: 'https://shippex-demo.bc.brandimic.com/api/',
  timeout: 10000,
});
