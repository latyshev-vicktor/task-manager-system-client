import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiButton, TuiSelect, TuiTextfield } from "@taiga-ui/core";
import { FieldActivityService } from "../../../services/field-activity-service";

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
    TuiSelect,
  ],
})
export class CreateSprintComponent implements OnInit {
  private readonly fieldActivityService = inject(FieldActivityService);

  ngOnInit(): void {
  }
}