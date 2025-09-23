import { BaseFilterModel } from "../base-filter.model";
import { BaseModel } from "../base.model";
import { TargetModel } from "../target/target.model";

export interface FieldActivityModel extends BaseModel {
  name: string;
  userId?: number;
}

export interface FieldActivityForSprintModel extends FieldActivityModel {
  targets: TargetModel[];
}

export interface CreateFieldActivityModel {
  name: string;
}

export interface FieldActivityFilterModel extends BaseFilterModel {
  name?: string;
  userId?: number;
}