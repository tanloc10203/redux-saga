import { City, ListResponses } from 'models';
import axiosClient from './axiosClient';

const cityAApti = {
  getAll(): Promise<ListResponses<City>> {
    return axiosClient.get('/cities', {
      params: {
        _limit: 10,
        _page: 1,
      },
    });
  },
};

export default cityAApti;
