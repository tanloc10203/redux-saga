export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponses<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _order?: 'asc' | 'desc';
  _sort?: string;

  [key: string]: any;
}
