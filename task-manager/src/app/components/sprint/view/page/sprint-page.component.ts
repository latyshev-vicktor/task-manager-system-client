import { CommonModule, DatePipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TuiButton, TuiDialogService, TuiIcon, TuiTitle } from "@taiga-ui/core";
import { TuiBadge, TuiStatus, TuiTabs, TuiTab, TuiAccordion, TuiPush } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { SprintService } from "../../../../services/sprint-service";
import { SprintModel } from "../../../../models/sprint/sprint.model";
import { WeeksListComponent } from "../week/week-list.component";
import { TargetsListComponent } from "../target/target-list.component";
import { EditSprintDialogComponent } from "../../edit/edit-sprint-dialog.component";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { take } from "rxjs";
import { RealtimeService } from "../../../../services/real-time-service";

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
    TuiPush,
    TuiIcon
  ],
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.scss'],
  providers: [DatePipe]
})
export class SprintPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(SprintService);
  private dialogs = inject(TuiDialogService);
  private realTimeService = inject(RealtimeService);
  private readonly dialogContent = new PolymorpheusComponent(EditSprintDialogComponent);

  sprint = signal<SprintModel | null>(null);
  activeTabIndex = 0;
  isDistributionMode = false;
  showPush: boolean = false;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.loadSprint(id);

  }
  ngOnInit(): void {
    this.realTimeService.onSprintUpdated().subscribe(x => {
      this.showPush = true;
    });
  }

  toggle(show: boolean) {
    this.showPush = show;
  }

  loadSprint(id: number) {
    this.service.getById(id).subscribe(s => {
      this.sprint.set(s);
    });
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
        this.loadSprint(sprint.id);
      });
  }

  startSprint() {
    this.service.startSprint(this.sprint()!.id)
    .subscribe(() => {
      this.loadSprint(this.sprint()!.id);
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
}