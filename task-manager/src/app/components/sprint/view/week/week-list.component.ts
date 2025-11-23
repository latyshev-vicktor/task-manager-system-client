import { Component, inject, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { SprintWeekModel } from '../../../../models/sprint-week/sprint-week.model';
import { SprintService } from '../../../../services/sprint-service';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';

@Component({
  standalone: true,
  selector: 'app-weeks-list',
  imports: [
    CommonModule, 
    TuiCardLarge,
    TuiAppearance,
    TuiTitle,
    TuiHeader
  ],
  templateUrl: './week-list.component.html',
  styleUrls: ['./week-list.component.scss'],
})
export class WeeksListComponent implements OnInit {
  sprintId = input.required<number>();
  spintService = inject(SprintService);

  weeks: SprintWeekModel[] = [];

  ngOnInit(): void {
    this.loadWeeks();
  }

  loadWeeks() {
    this.spintService.getWeeksBySprintId(this.sprintId()).subscribe(weeks => {
      this.weeks = weeks;
    })
  }
}
