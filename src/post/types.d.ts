export interface IPaginatePost {
  data: any[];
  count: number;
  currentPage: number;
  totalPages: number;
  previousPage: number;
  nextPage: number;
}
