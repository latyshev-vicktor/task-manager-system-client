import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiAlertService, TuiButton, TuiDialogContext, TuiError, TuiSelectLike, TuiTextfield } from "@taiga-ui/core";
import { FieldActivityService } from "../../../services/field-activity-service";
import { SprintService } from "../../../services/sprint-service";
import { FieldActivityModel } from "../../../models/field-activity/field-activity.model";
import { TuiChevron, TuiDataListWrapper, TuiFieldErrorPipe, TuiInputChip, TuiInputNumber, TuiMultiSelect, TuiTextarea, TuiTextareaLimit, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { CreateSprintModel } from "../../../models/sprint/sprint.model";
import { POLYMORPHEUS_CONTEXT } from "@taiga-ui/polymorpheus";

const MAX_LENGTH_DESCRIPTION = 200;

export function minCountWeekValidator(field: AbstractControl): Validators | null {
  return field.value > 0
    ? null
    : {
        other: 'Количество недель не может быть меньше 1'
      };
}

export function maxLengthDescription(field: AbstractControl): Validators | null {
  return field.value.length < MAX_LENGTH_DESCRIPTION
    ? null
    : {
        other: `Описание спринта не может превышать ${MAX_LENGTH_DESCRIPTION} символов`
      };
}

@Component({
  selector: 'app-sprint-create-dialog',
  standalone: true,
  templateUrl: './create-sprint-dialog.component.html',
  styleUrl: './create-sprint-dialog.component.scss',
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
    TuiInputNumber,
    TuiTextarea,
    TuiTextareaLimit,
  ],
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле необходимо для заполнения',
    })
  ]
})
export class CreateSprintComponent implements OnInit {
  private readonly context = inject<TuiDialogContext<number | null, CreateSprintModel | null>>(POLYMORPHEUS_CONTEXT);
  private readonly fieldActivityService = inject(FieldActivityService);
  private readonly sprintService = inject(SprintService);
  private readonly alerts = inject(TuiAlertService);
  
  fieldActivities: FieldActivityModel[] = [];
  readonly stringify = (item: FieldActivityModel): string => item.name;

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, maxLengthDescription] }),
    fieldActivityIds: new FormControl<number[]>([], { nonNullable: true, validators: [Validators.required, Validators.minLength(1)] }),
    weekCount: new FormControl<number>(1, { nonNullable: true, validators: [minCountWeekValidator] }),
  });

  ngOnInit(): void {
    this.loadFieldActivities();
  }

  loadFieldActivities() {
    this.fieldActivityService.getMy().subscribe(models => {
      this.fieldActivities = models;
    });
  }

  create() : void {
    if(!this.form.valid) {
      return;
    }

    const model = this.form.getRawValue();
    const transformedModel = {
      ...model,
      fieldActivityIds: model.fieldActivityIds.map((x: any) => x.id),
    };

    this.sprintService.create(transformedModel).subscribe((id) => {
      this.alerts.open('Спринт создан!', {
        label: 'Успешно',
        appearance: 'positive',
      }).subscribe();

      this.context.completeWith(id);
    }, error => {
      const errorMessage = error?.error?.message;
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