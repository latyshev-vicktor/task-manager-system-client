import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield, TuiAlertService } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, TuiTextarea, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CreateTaskModel, TaskModel } from '../../../../../models/task/task.model';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TaskService } from '../../../../../services/task-service';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiForm,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    TuiTextarea,
    TuiButton
  ],
  templateUrl: './task-edit-dialog.component.html',
  styleUrl: './task-edit-dialog.component.scss',
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле необходимо для заполнения',
    })
  ]
})
export class TaskEditDialogComponent implements OnInit {
  private readonly context = inject<TuiDialogContext<number | null, { targetId: number; task?: TaskModel }>>(POLYMORPHEUS_CONTEXT);
  private readonly alerts = inject(TuiAlertService);
  private readonly taskService = inject(TaskService);

  readonly isNew = !this.context?.data?.task?.id;
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    if (!this.isNew && this.context.data.task) {
      this.form.patchValue({
        name: this.context.data.task.name,
        description: this.context.data.task.description
      });
    }
  }

  submit() {
    if (!this.form.valid)
      return;

    const { name, description } = this.form.getRawValue();
    const { targetId, task } = this.context.data;

    let observable: Observable<number>;
    let successMessage = this.isNew ? 'Задача создана!' : 'Задача обновлена!'
    if(this.isNew) {
      observable = this.taskService.create({name, description, targetId});
    } else {
      observable = this.taskService.update({
        id: task!.id,
        name,
        description,
        targetId,
        status: task!.status,
        createdDate: task!.createdDate
      });
    }

    observable.subscribe((id) => {
      this.alerts.open(
          successMessage,
          { 
            label: 'Успешно', appearance: 'positive' 
          }
        ).subscribe();

      this.context.completeWith(id);
    }, error => {
      const msg = error?.error?.message ?? 'Неизвестная ошибка';
      this.alerts.open(msg, {
        label: 'Ошибка',
        appearance: 'negative',
      }).subscribe();
    })
  }

  close() {
    this.context.completeWith(null);
  }
}

