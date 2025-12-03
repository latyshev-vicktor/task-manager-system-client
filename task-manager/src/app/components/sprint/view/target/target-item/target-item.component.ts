import { CommonModule } from "@angular/common";
import { Component, EventEmitter, input, Input, OnInit, Output, output, inject } from "@angular/core";
import { TuiButton, TuiDialogService, TuiAlertService } from "@taiga-ui/core";
import { TUI_CONFIRM, TuiAccordion, TuiProgress } from "@taiga-ui/kit";
import { TargetModel } from "../../../../../models/target/target.model";
import { TaskModel } from "../../../../../models/task/task.model";
import { TaskService } from "../../../../../services/task-service";
import { TaskEditDialogComponent } from "../task-edit/task-edit-dialog.component";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { Observable, take } from "rxjs";
import { TargetEditDialogComponent } from "../../target-edit/target-edit-dialog.component";
import { DragDropModule, CdkDrag } from "@angular/cdk/drag-drop";

@Component({
selector: 'app-target-item',
standalone: true,
  imports: [
  CommonModule, 
  TuiAccordion, 
  TuiProgress, 
  TuiButton,
  DragDropModule,
  CdkDrag
],
templateUrl: './target-item.component.html',
styleUrls: ['./target-item.component.scss']
})
export class TargetItemComponent implements OnInit {
  target = input.required<TargetModel>();
  updateTarget = output<void>();

  private dialogs = inject(TuiDialogService);
  private taskService = inject(TaskService);
  private alerts = inject(TuiAlertService);
  private readonly taskDialogContent = new PolymorpheusComponent(TaskEditDialogComponent);
  private readonly targetDialogContent = new PolymorpheusComponent(TargetEditDialogComponent);

  ngOnInit(): void {
  }

  getCompletedCount(target: TargetModel): number {
    return target.tasks?.filter((t: TaskModel) => t.status.name === 'Completed').length ?? 0;
  }

  get totalTasks(): number {
    return this.target().tasks?.length ?? 0;
  }

  isTaskCompleted(task: TaskModel): boolean {
    return task.status.name === 'Completed';
  }

  toggleTaskStatus(task: TaskModel) {
    let observable: Observable<void>;
    if(task.status.name === 'Completed') {
      observable = this.taskService.setCreatedStatus(task.id);
    } else {
      observable = this.taskService.complete(task.id);
    }

    observable.subscribe(() => {
      this.updateTarget.emit();
    }, error => {
      this.alerts.open(error?.error?.message, {
          label: 'Ошибка',
          appearance: 'negative',
        }).subscribe();
    });
  }

  openCreateTask() {
    this.dialogs
      .open<number>(this.taskDialogContent, {
        label: 'Создание задачи',
        size: 'm',
        data: {
          targetId: this.target().id
        }
      })
      .pipe(take(1))
      .subscribe(() => {
        this.updateTarget.emit();
      });
  }

  openEditTask(task: TaskModel) {
    this.dialogs
      .open<number>(this.taskDialogContent, {
        label: 'Редактирование задачи',
        size: 'm',
        data: {
          targetId: this.target().id,
          task: task
        }
      })
      .pipe(take(1))
      .subscribe(() => {
        this.updateTarget.emit();
      });
  }

  deleteTask(task: TaskModel) {
    const message = `<div>Вы уверены что хотите удалить задачу?</div>`;
        this.dialogs.open<boolean>(
          TUI_CONFIRM, {
            label: 'Подтверждение',
            data: {
              content: message,
              no: 'Нет',
              yes: 'Да'
            }
          }
        ).subscribe((response) => {
          if(!response) return;

          this.taskService.delete(task.id).subscribe({
            next: () => {
              this.alerts.open('Задача удалена!', {
                label: 'Успешно',
                appearance: 'positive',
              }).subscribe();
              this.updateTarget.emit();
            },
            error: (error) => {
              this.alerts.open(error?.error?.message ?? 'Ошибка при удалении задачи', {
                label: 'Ошибка',
                appearance: 'negative',
              }).subscribe();
            }
          });
        });
  }

  openEditTarget() {
    const target = this.target();
    this.dialogs
      .open<number>(this.targetDialogContent, {
        label: 'Редактирование цели',
        size: 'm',
        data: {
          id: target.id,
          sprintId: target.sprintId,
          name: target.name,
          createdDate: target.createdDate,
          tasks: target.tasks || []
        }
      })
      .pipe(take(1))
      .subscribe(() => {
        this.updateTarget.emit();
      });
  }
}
