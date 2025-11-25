import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";
import { TuiBadge, TuiStatus } from "@taiga-ui/kit";
import { TuiCardLarge } from "@taiga-ui/layout";
import { SprintService } from "../../../../services/sprint-service";
import { SprintModel } from "../../../../models/sprint/sprint.model";
import { WeeksListComponent } from "../week/week-list.component";
import { TargetsListComponent } from "../target/target-list.component";

@Component({
  standalone: true,
  selector: 'app-sprint-page',
  imports: [
    CommonModule,
    TuiButton,
    TuiBadge,
    TuiStatus,
    TuiCardLarge,
    WeeksListComponent,
    TargetsListComponent,
  ],
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.scss'],
})
export class SprintPageComponent {
  private route = inject(ActivatedRoute);
  private service = inject(SprintService);

  sprint = signal<SprintModel | null>(null);

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id).subscribe(s => {
      this.sprint.set(s)
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
}