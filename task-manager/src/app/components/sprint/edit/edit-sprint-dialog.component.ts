import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiAlertService, TuiButton, TuiDialogContext, TuiError, TuiSelectLike, TuiTextfield } from "@taiga-ui/core";
import { FieldActivityService } from "../../../services/field-activity-service";
import { SprintService } from "../../../services/sprint-service";
import { FieldActivityForSprintModel, FieldActivityModel } from "../../../models/field-activity/field-activity.model";
import { TuiChevron, TuiDataListWrapper, TuiFieldErrorPipe, TuiInputChip, TuiMultiSelect, TuiTextarea, TuiTextareaLimit, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { SprintModel } from "../../../models/sprint/sprint.model";
import { POLYMORPHEUS_CONTEXT } from "@taiga-ui/polymorpheus";
import { firstValueFrom } from "rxjs";

const MAX_LENGTH_DESCRIPTION = 200;

export function maxLengthDescription(field: AbstractControl): Validators | null {
  return field.value.length < MAX_LENGTH_DESCRIPTION
    ? null
    : {
        other: `Описание спринта не может превышать ${MAX_LENGTH_DESCRIPTION} символов`
      };
}

@Component({
  selector: 'app-sprint-edit-dialog',
  standalone: true,
  templateUrl: './edit-sprint-dialog.component.html',
  styleUrl: './edit-sprint-dialog.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiInputChip,
    TuiMultiSelect,
    TuiChevron,
    TuiSelectLike,
    FormsModule,
    TuiTextarea,
    TuiTextareaLimit,
  ],
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле необходимо для заполнения',
    })
  ]
})
export class EditSprintDialogComponent implements OnInit {
  private readonly context = inject<TuiDialogContext<number | null, SprintModel>>(POLYMORPHEUS_CONTEXT);
  private readonly fieldActivityService = inject(FieldActivityService);
  private readonly sprintService = inject(SprintService);
  private readonly alerts = inject(TuiAlertService);
  
  fieldActivities: FieldActivityModel[] = [];
  readonly stringify = (item: FieldActivityModel): string => item.name;

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, maxLengthDescription] }),
    fieldActivityIds: new FormControl<FieldActivityModel[]>([], { nonNullable: true, validators: [Validators.required, Validators.minLength(1)] }),
  });

  ngOnInit(): void {
    this.loadFieldActivities();
  }

  loadFieldActivities() {
    this.fieldActivityService.getMy().subscribe(models => {
      this.fieldActivities = models;
      this.loadSprintData();
    });
  }

  loadSprintData() {
    const sprint = this.context.data;
    if (sprint) {
      // Находим сферы деятельности из загруженного списка, которые привязаны к спринту
      const selectedFieldActivities: FieldActivityModel[] = [];
      if (sprint.fieldActivities && sprint.fieldActivities.length > 0) {
        sprint.fieldActivities.forEach(sprintFa => {
          const found = this.fieldActivities.find(fa => fa.id === sprintFa.id);
          if (found) {
            selectedFieldActivities.push(found);
          }
        });
      }
      
      this.form.patchValue({
        name: sprint.name,
        description: sprint.description,
        fieldActivityIds: selectedFieldActivities
      });
    }
  }

  update() {
    if(!this.form.valid) {
      return;
    }

    const sprint = this.context.data;
    const model = this.form.getRawValue();
    const transformedModel = {
      id: sprint.id,
      createdDate: sprint.createdDate,
      name: model.name,
      description: model.description,
      sprintStatus: this.context.data.sprintStatus,
      fieldActivities: model.fieldActivityIds.map(x => {
        let fieldActivity = x as FieldActivityForSprintModel;
        fieldActivity.sprintId = this.context.data.id
        return fieldActivity;
      }),
    } as SprintModel;

    this.sprintService.update(transformedModel).subscribe(() => {
      this.alerts.open('Спринт обновлен!', {
          label: 'Успешно',
          appearance: 'positive',
        });

      this.context.completeWith(null);
    }, error => {
      const errorMessage = error?.error?.message ?? 'Неизвестная ошибка';
      this.alerts.open(errorMessage, {
        label: 'Ошибка',
        appearance: 'negative',
      }).subscribe();
    });
  }

  close() {
    this.context.completeWith(null);
  }
}

