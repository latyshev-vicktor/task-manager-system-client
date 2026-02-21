import { BaseFilterModel } from "../base-filter.model";
import { BaseModel } from "../base.model";
import { TargetModel } from "../target/target.model";
import { SprintModel } from '../sprint/sprint.model';

export interface FieldActivityModel extends BaseModel {
  name: string;
  userId?: string;
}

export interface FieldActivityForSprintModel extends FieldActivityModel {
  sprintId: string;
  sprint?: SprintModel;
}

export interface CreateFieldActivityModel {
  name: string;
}

export interface FieldActivityFilterModel extends BaseFilterModel {
  name?: string;
  userId?: string;
}