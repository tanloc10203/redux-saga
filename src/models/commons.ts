export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ListResponses<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  page: number;
  limit: number;
  order: string;
  sort: 'asc' | 'desc';
  [key: string]: any;
}
