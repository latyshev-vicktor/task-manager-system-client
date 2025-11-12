import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAppearance, TuiHint, TuiTextfield, TuiScrollbar, TuiDialogService } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { SprintModel } from '../../../models/sprint/sprint.model';
import { AuthService } from '../../../services/auth-service';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { CreateSprintComponent } from '../create/create-sprint-dialog.component';
import { SprintService } from '../../../services/sprint-service';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [
    FormsModule,
    TuiButton,
    TuiTextfield,
    TuiCardLarge,
    TuiAppearance,
    DatePipe,
    TuiHint,
    TuiScrollbar,
    LucideAngularModule
],
  templateUrl: './sprint-list.component.html',
  styleUrl: './sprint-list.component.scss'
}) 
export class SprintListComponent implements OnInit {
  readonly Plus = Plus;
  private readonly dialogs = inject(TuiDialogService);

  ngOnInit(): void {
    this.sprintService.search({take: 1000, skip: 0}).subscribe(data => {
      this.sprints = data.data;
    })
  }
  
  router = inject(Router);
  authService = inject(AuthService);
  sprintService = inject(SprintService);

  search = '';

  sprints: SprintModel[] = [];

  get created(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.description === 'Созданный');
  }

  get active(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.description === 'В работе');
  }

  get done(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.description === 'Завершенный');
  }

  get filteredSprints() {
    return this.sprints.filter((s) =>
      s.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  openSprintDetails(sprint: SprintModel) {
    this.router.navigate(['/sprints', sprint.id]);
  }

  createSprint() {
    this.dialogs
      .open<number>(new PolymorpheusComponent(CreateSprintComponent), {
        label: 'Создание',
        size: 'l'
      })
      .subscribe(result => {
        console.log(`Спринт с id ${result}`);
      });
  }
}
