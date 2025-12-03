import { Component, inject, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { SprintWeekModel } from '../../../../models/sprint-week/sprint-week.model';
import { SprintService } from '../../../../services/sprint-service';
import { TuiAppearance, TuiTitle, TuiAlertService } from '@taiga-ui/core';
import { DragDropModule, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../../../models/task/task.model';

@Component({
  standalone: true,
  selector: 'app-weeks-list',
  imports: [
    CommonModule, 
    TuiCardLarge,
    TuiAppearance,
    TuiTitle,
    TuiHeader,
    DragDropModule,
    CdkDropList
  ],
  templateUrl: './week-list.component.html',
  styleUrls: ['./week-list.component.scss'],
})
export class WeeksListComponent implements OnInit {
  sprintId = input.required<number>();
  spintService = inject(SprintService);
  alerts = inject(TuiAlertService);

  weeks: SprintWeekModel[] = [];
  receivingWeekId: number | null = null;

  ngOnInit(): void {
    this.loadWeeks();
  }

  loadWeeks() {
    this.spintService.getWeeksBySprintId(this.sprintId()).subscribe(weeks => {
      this.weeks = weeks;
    })
  }

  isReceiving(weekId: number): boolean {
    return this.receivingWeekId === weekId;
  }

  onDragEntered(event: any, week: SprintWeekModel) {
    this.receivingWeekId = week.id;
  }

  onDragExited(event: any, week: SprintWeekModel) {
    this.receivingWeekId = null;
  }

  onTaskDropped(event: CdkDragDrop<TaskModel[], any>, week: SprintWeekModel) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (!event.isPointerOverContainer) {
      return;
    }

    const task = event.item.data as TaskModel;
    
    if (!task || !task.id) {
      return;
    }
    
    const taskExists = week.tasks?.some(t => t.id === task.id);
    if (taskExists) {
      this.alerts.open('Эта задача уже добавлена в эту неделю', {
        label: 'Информация',
        appearance: 'info',
      }).subscribe();
      return;
    }

    if (!week.tasks) {
      week.tasks = [];
    }
    const tempTask = { ...task };
    week.tasks = [...week.tasks, tempTask];

    // this.spintService.addTaskToWeek(week.id, task.id).subscribe({
    //   next: () => {
    //     this.alerts.open('Задача добавлена в неделю', {
    //       label: 'Успешно',
    //       appearance: 'positive',
    //     }).subscribe();
    //   },
    //   error: (error) => {
    //     week.tasks = week.tasks.filter(t => t.id !== task.id);
    //     this.alerts.open(error?.error?.message ?? 'Ошибка при добавлении задачи', {
    //       label: 'Ошибка',
    //       appearance: 'negative',
    //     }).subscribe();
    //   }
    // });
  }
}
