// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://fake-coffee-api.vercel.app/',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export default {
//   async getProducts() {
//     const response = await apiClient.get('api');
//     return response.data;
//   },
// };


import localdata from '@app-services/localdata/localdata.js'

export default {
  async getProducts() {
    const response = localdata;
    return response;
  },
};