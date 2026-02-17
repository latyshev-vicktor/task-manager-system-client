import { BaseFilterModel } from "../base-filter.model";
import { BaseModel } from "../base.model";
import { FieldActivityForSprintModel } from "../field-activity/field-activity.model";

export interface SprintModel extends BaseModel {
  userId: string;
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
  weekCount: number;
}

export interface SprintFilterModel extends BaseFilterModel {
  userId?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate: string;
  fieldActivityId?: string;
  fieldActivityIds?: [];
}