import { computed } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { FieldActivityModel } from '../../../models/field-activity/field-activity.model';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';

@Component({
  standalone: true,
  selector: 'app-field-activity-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiTitle,
    TuiTextfield,
    TuiHeader,
    TuiError,
    TuiFieldErrorPipe
  ],
  providers: [
    tuiValidationErrorsProvider({
        required: 'Поле необходимо для заполнения',
    }),
  ],
  templateUrl: './field-activity-dialog.component.html',
  styleUrls: [
    './field-activity-dialog.component.scss'
  ]
})
export class FieldActivityDialogComponent implements OnInit {
  private readonly context = inject<TuiDialogContext<FieldActivityModel | null, FieldActivityModel | null>>(POLYMORPHEUS_CONTEXT);

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ])
  });

  get isEdit() {
    return !!this.context.data;
  }

  ngOnInit(): void {
    if(this.isEdit) {
      this.form.get('name')?.setValue(this.context.data.name);
    }
  }

  save() {
    if (this.form.valid) {
      const name = this.form.getRawValue().name!.trim();
      this.context.completeWith({ id: this.context.data?.id ?? 0, name: name });
    }
  }

  close() {
    this.context.completeWith(null);
  }
}
