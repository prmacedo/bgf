import axios from 'axios';

const API_URL = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default API_URL;