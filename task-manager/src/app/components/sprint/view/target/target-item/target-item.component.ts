import { CommonModule } from "@angular/common";
import { Component, EventEmitter, input, Input, OnInit, Output } from "@angular/core";
import { TuiButton } from "@taiga-ui/core";
import { TuiAccordion, TuiProgress } from "@taiga-ui/kit";
import { TargetModel } from "../../../../../models/target/target.model";
import { TaskModel } from "../../../../../models/task/task.model";

@Component({
selector: 'app-target-item',
standalone: true,
imports: [CommonModule, TuiAccordion, TuiProgress, TuiButton],
templateUrl: './target-item.component.html',
styleUrls: ['./target-item.component.scss']
})
export class TargetItemComponent implements OnInit {
  target = input.required<TargetModel>();
  @Output() updateTarget = new EventEmitter<any>();

  constructor() {
    
  }

  ngOnInit(): void {
  }

  getCompletedCount(target: TargetModel): number {
    return target.tasks?.filter((t: TaskModel) => t.status.name === 'Completed').length ?? 0;
  }

  addTask() {}
}