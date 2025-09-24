import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAppearance, TuiHint, TuiTextfield, TuiScrollbar } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { SprintModel } from '../../models/sprint/sprint.model';

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
    TuiScrollbar
],
  templateUrl: './sprint-list.component.html',
  styleUrl: './sprint-list.component.scss'
}) 
export class SprintListComponent {
  router = inject(Router);

  search = '';

  sprints: SprintModel[] = [
    {
      id: 1,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 2,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 3,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },


    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },

    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    
    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 4,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринта',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Созданный', description: 'Созданный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 5,
      userId: 100,
      name: 'Спринт 2',
      description: 'Описание второго спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 16),
      endDate: new Date(2025, 8, 30),
      sprintStatus: { name: 'В работе', description: 'В работе' },
      fieldActivities: [{ id: 3, name: 'Дизайн', targets: [], createdDate:  new Date(2025, 8, 1)  }],
      createdDate:  new Date(2025, 8, 1)
    },
    {
      id: 6,
      userId: 100,
      name: 'Спринт 1',
      description: 'Описание первого спринтаыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы',
      startDate: new Date(2025, 8, 1),
      endDate: new Date(2025, 8, 15),
      sprintStatus: { name: 'Завершенный', description: 'Завершенный' },
      fieldActivities: [
        { id: 1, name: 'Разработка', targets: [], createdDate:  new Date(2025, 8, 1) },
        { id: 2, name: 'Тестирование', targets: [], createdDate: new Date(2025, 8, 1) },
      ],
      createdDate:  new Date(2025, 8, 1)
    },
  ];

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
