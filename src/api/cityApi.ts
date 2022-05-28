import { City, ListResponses } from 'models';
import axiosClient from './axiosClient';

const cityApi = {
  getAll(): Promise<ListResponses<City>> {
    return axiosClient.get('/cities', {
      params: {
        _limit: 10,
        _page: 1,
      },
    });
  },
};

export default cityApi;
