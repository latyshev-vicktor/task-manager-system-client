import { FieldActivityModel } from './../../../models/field-activity/field-activity.model';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDialogContext, TuiButton, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';

@Component({
  standalone: true,
  selector: 'app-field-activity-dialog',
  imports: [
    ReactiveFormsModule, 
    TuiButton,  
    TuiTextarea, 
    TuiTextfield, 
    TuiTitle
  ],
  styleUrl: './field-activity-edit.component.scss',
  templateUrl: './field-activity-edit.component.html'
})
export class FieldActivityDialogComponent {
  // private readonly context = inject<TuiDialogContext<FieldActivityModel | null, FieldActivityModel>>(TuiDialogContext);
  // form = new FormGroup({
  //   name: new FormControl(this.context.data?.name ?? '', Validators.required),
  // });

  // get data() {
  //   return this.context.data;
  // }

  // save() {
  //   if (this.form.invalid) return;
  //   //this.context.completeWith(this.form.getRawValue());
  // }

  // close() {
  //   this.context.completeWith(null);
  // }
}