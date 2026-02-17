export interface BaseFilterModel {
  id?: string;
  skip: number;
  take: number;
  sortBy: string;
  sortDesc: boolean;
}