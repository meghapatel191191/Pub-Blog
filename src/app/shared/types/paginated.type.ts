export type Paginated<T> = {
  code: number;
  data: T[];
  meta: {
    pagination: {
      limit: number;
      page: number;
      pages: number;
      total: number;
    }
  }
}
