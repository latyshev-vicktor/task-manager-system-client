import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAppearance, TuiHint, TuiTextfield, TuiScrollbar } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { SprintModel } from '../../../models/sprint/sprint.model';
import { AuthService } from '../../../services/auth-service';
import { LucideAngularModule, Plus } from 'lucide-angular';

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

  ngOnInit(): void {
    
  }
  
  router = inject(Router);
  authService = inject(AuthService);

  search = '';

  sprints: SprintModel[] = [];

  get created(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.name === 'Созданный');
  }

  get active(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.name === 'В работе');
  }

  get done(): SprintModel[] {
    return this.sprints.filter(s => s.sprintStatus?.name === 'Завершенный');
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
    console.log('Открыть модалку для создания спринта');
  }
}
