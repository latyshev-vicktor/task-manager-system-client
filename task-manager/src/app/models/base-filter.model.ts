export interface BaseFilterModel {
  id?: number;
  skip: number;
  take: number;
  sortBy: string;
  sortDesc: boolean;
}