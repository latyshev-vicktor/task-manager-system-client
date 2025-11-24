import { Component, Input, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiButton } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';
import { SprintService } from '../../../../services/sprint-service';
import { TargetModel } from '../../../../models/target/target.model';
import { TargetEditDialogComponent } from '../target-edit/target-edit-dialog.component';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { take } from 'rxjs';
import { TargetItemComponent } from './target-item/target-item.component';

@Component({
  standalone: true,
  selector: 'app-targets-list',
  imports: [
    CommonModule, 
    TuiCardMedium, 
    TuiButton,
    TargetItemComponent
],
  templateUrl: './target-list.component.html',
  styleUrl: './target-list.component.scss'
})
export class TargetsListComponent implements OnInit {
  sprintId = input.required<number>();
  targets: TargetModel[] = [];

  private dialogs = inject(TuiDialogService);
  private sprintService = inject(SprintService);
  private readonly dialogContent = new PolymorpheusComponent(TargetEditDialogComponent);

  ngOnInit(): void {
    this.loadTargets();
  }

  loadTargets() {
    this.sprintService.getTargetsBySprintId(this.sprintId()).subscribe(targets => {
      this.targets = targets;
    })
  }

  openCreate() {
    this.dialogs
      .open<number>(this.dialogContent, {
        label: 'Создание',
        size: 'm',
        data: {
          id: null,
          sprintId: this.sprintId()
        }
      })
      .pipe(take(1)).subscribe(() => {
        this.loadTargets();
      });
  }

  openEdit(target: TargetModel) {
    this.dialogs
      .open<number>(this.dialogContent, {
        label: 'Редактирование',
        size: 'm',
        data: {
          id: target.id,
          sprintId: this.sprintId(),
          name: target.name,
          createdDate: target.createdDate,
          tasks: []
        }
      }).pipe(take(1)).subscribe(() => {
        this.loadTargets();
      })
  }
}
