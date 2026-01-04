import { SprintService } from './../../../../services/sprint-service';
import { CommonModule, DatePipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TuiAlertService, TuiButton, TuiDialogService, TuiTitle } from "@taiga-ui/core";
import { TuiBadge, TuiStatus, TuiTabs, TuiTab, TuiAccordion, TUI_CONFIRM } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { SprintModel } from "../../../../models/sprint/sprint.model";
import { WeeksListComponent } from "../week/week-list.component";
import { TargetsListComponent } from "../target/target-list.component";
import { EditSprintDialogComponent } from "../../edit/edit-sprint-dialog.component";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { take } from "rxjs";

@Component({
  standalone: true,
  selector: 'app-sprint-page',
  imports: [
    CommonModule,
    TuiButton,
    TuiBadge,
    TuiStatus,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiTabs,
    TuiTab,
    TuiAccordion,
    WeeksListComponent,
    TargetsListComponent,
  ],
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.scss'],
  providers: [DatePipe]
})
export class SprintPageComponent {
  private route = inject(ActivatedRoute);
  private service = inject(SprintService);
  private dialogs = inject(TuiDialogService);
  private alerts = inject(TuiAlertService);
  private readonly dialogContent = new PolymorpheusComponent(EditSprintDialogComponent);

  sprint = signal<SprintModel | null>(null);
  activeTabIndex = 0;
  isDistributionMode = false;
  sprintId: any = this.route.snapshot.params['id'];

  constructor() {
    this.loadSprint();
  }

  loadSprint() {
    this.service.getById(this.sprintId).subscribe(s => {
      this.sprint.set(s);
    });
  }

  start() {
    this.service.startSprint(this.sprint()!.id).subscribe(x => {
      this.loadSprint();
    }, error => {
      const errorMessage = error?.error?.message;
      this.alerts.open(errorMessage, {
        label: 'Ошибка',
        appearance: 'negative'
      }).subscribe()
    })
  }

  openEdit() {
    const sprint = this.sprint();
    if (!sprint) return;

    this.dialogs
      .open<number>(this.dialogContent, {
        label: 'Редактирование спринта',
        size: 'm',
        data: sprint
      })
      .pipe(take(1))
      .subscribe(() => {
        this.loadSprint();
      });
  }

  get statusColor(): string {
    const s = this.sprint()?.sprintStatus.name;
    switch (s) {
      case 'Created': return 'success';
      case 'InProgress': return 'warning';
      case 'Completed': return 'info';
      default: return 'warning';
    }
  }

  get daysRemaining(): number {
    const sprint = this.sprint();
    if (!sprint) return 0;
    const today = new Date();
    const endDate = new Date(sprint.endDate);
    const diff = endDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get progressPercentage(): number {
    const sprint = this.sprint();
    if (!sprint) return 0;
    const today = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const total = endDate.getTime() - startDate.getTime();
    const elapsed = today.getTime() - startDate.getTime();
    let result =  Math.min(100, Math.max(0, (elapsed / total) * 100));
    result = Math.round(result);
    return result;
  }

  toggleDistributionMode() {
    this.isDistributionMode = !this.isDistributionMode;
  }

  normalize(date: Date): number {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
  }

  startSprint() {
    const sprint = this.sprint();
    if(sprint == null) return;

    const createdDate = new Date(sprint.createdDate!);
    const today = new Date();
    if(this.normalize(createdDate) !== this.normalize(today)) {
      const message = `<div>Сроки окончания спринта будут пересчитаны в зависимости от количества недель. Продолжить?</div>`;
        this.dialogs.open<boolean>(
          TUI_CONFIRM, {
            label: 'Подтверждение',
            data: {
              content: message,
              no: 'Нет',
              yes: 'Да'
            }
          }
        ).subscribe(response => {
          if(!response) return;

          this.service.startSprint(this.sprint()!.id).subscribe(() => {
            this.loadSprint();
          }, error => {
            const msg = error?.error?.message ?? 'Неизвестная ошибка';
            this.alerts.open(msg, {
              label: 'Ошибка',
              appearance: 'negative',
            }).subscribe();
          })
        })
    }
  }
}