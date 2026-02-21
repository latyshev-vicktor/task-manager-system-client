import { BaseModel } from "../base.model";
import { TargetModel } from "../target/target.model";

export interface TaskModel extends BaseModel {
  name: string;
  description: string;
  status: TaskStatus;
  targetId: string;
  target?: TargetModel;
}

export interface TaskStatus {
  name: string;
  description: string;
}

export interface CreateTaskModel {
  name: string;
  description: string;
  targetId?: string;
}