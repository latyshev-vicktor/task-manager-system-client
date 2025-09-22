import { BaseFilterModel } from "../base-filter.model";
import { BaseModel } from "../base.model";
import { FieldActivityForSprintModel } from "../field-activity/field-activity.model";

export interface SprintModel extends BaseModel {
  userId: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  sprintStatus: SprintStatusModel;
  fieldActivities: FieldActivityForSprintModel[];
}

export interface SprintStatusModel {
  name: string;
  description: string;
}

export interface CreateSprintModel {
  name: string;
  description: string;
  fieldActivityIds: number[];
  startDate: Date;
  endDate: Date;
}

export interface SprintFilterModel extends BaseFilterModel {
  userId?: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate: string;
  fieldActivityId?: number;
  fieldActivityIds?: [];
}