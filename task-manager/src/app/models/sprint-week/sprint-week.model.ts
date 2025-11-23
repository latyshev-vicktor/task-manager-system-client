import { BaseModel } from "../base.model";
import { SprintModel } from "../sprint/sprint.model";
import { TaskModel } from "../task/task.model";

export interface SprintWeekModel extends BaseModel {
  sprintId: number;
  sprint?: SprintModel;
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  tasks: TaskModel[];
}