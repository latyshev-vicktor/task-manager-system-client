import { Component, inject, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield, TuiDialogService, TuiDialogContext, TuiAlertService, TuiError, TUI_DARK_MODE_KEY } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';
import { CreateTargetModel, TargetModel } from '../../../../models/target/target.model';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TargetService } from '../../../../services/target-service';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-target-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiButton
  ],
  templateUrl: './target-edit-dialog.component.html',
  styleUrl: './target-edit-dialog.component.scss',
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле необходимо для заполнения',
    })
  ]
})
export class TargetEditDialogComponent implements OnInit {
  private readonly context = inject<TuiDialogContext<number | null, TargetModel | null>>(POLYMORPHEUS_CONTEXT);
  private readonly alerts = inject(TuiAlertService);
  private readonly targetService = inject(TargetService);

  readonly isNew = !this.context?.data?.id;
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    if(!this.isNew) {
      this.form.patchValue({ name: this.context.data.name });
    }
  }

  async submit() {
    if(!this.form.valid)
      return;

    const name = this.form.getRawValue().name;
    const { sprintId, id, createdDate, tasks } = this.context.data;

    try {
      const result = await firstValueFrom(
        this.isNew
          ? this.targetService.create({ sprintId, name })
          : this.targetService.update({ id, sprintId, name, createdDate, tasks })
      );

      await firstValueFrom(
        this.alerts.open(
          this.isNew ? 'Цель создана!' : 'Цель обновлена!',
          { label: 'Успешно', appearance: 'positive' }
        )
      );

      this.context.completeWith(result);

    } catch (error: any) {
      const msg = error?.error?.message ?? 'Неизвестная ошибка';

      this.alerts.open(msg, {
        label: 'Ошибка',
        appearance: 'negative',
      }).subscribe();
    }
  }

  close() {
    this.context.completeWith(null);
  }
}

