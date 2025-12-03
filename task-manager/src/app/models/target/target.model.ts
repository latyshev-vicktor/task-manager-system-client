import { BaseModel } from "../base.model";
import { TaskModel } from "../task/task.model";

export interface TargetModel extends BaseModel {
  name: string;
  sprintId: number;
  tasks: TaskModel[];
}

export interface CreateTargetModel {
  name: string;
  sprintId: number;
}