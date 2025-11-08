import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiLoader, TuiTitle, TuiAppearance, TuiDialogService, TuiAlertService } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { FieldActivityModel } from '../../../models/field-activity/field-activity.model';
import { FieldActivityService } from '../../../services/field-activity-service';
import { LucideAngularModule, Plus, Edit, Trash2 } from 'lucide-angular';
import {TUI_CONFIRM, type TuiConfirmData} from '@taiga-ui/kit';
import { FieldActivityDialogComponent } from '../view/field-activity-dialog.component';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-field-activities',
  standalone: true,
  templateUrl: './field-activities-list.component.html',
  styleUrls: ['./field-activities-list.component.scss'],
  imports: [
    CommonModule,
    TuiButton,
    TuiLoader,
    TuiCardMedium,
    TuiTitle,
    LucideAngularModule,
    TuiAppearance  
  ],
})
export class FieldActivitiesListComponent implements OnInit {
  private readonly service = inject(FieldActivityService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alerts = inject(TuiAlertService);

  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash = Trash2

  loading = true;
  models: FieldActivityModel[] = [];

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getMy().subscribe({
      next: data => {
        this.models = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  deleteFieldActivity(id: number, name: string) {
    const message = `<div>Вы уверены что хотите удалить Сферу деятельности <strong>${name}</strong>.</div>`;
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

      this.service.delete(id).subscribe(() => {
        this.alerts.open('Запись успешно удалена', {
          label: 'Успешно',
          appearance: 'positive',
        }).subscribe();
        this.load();
      }, error => {
        const errorMessage = error?.error?.message;
        this.alerts.open(errorMessage, {
          label: 'Ошибка',
          appearance: 'negative',
        }).subscribe();
        this.load();
      });
    })
  }

  openEditDialog(activity: FieldActivityModel) {
    this.dialogs
      .open<FieldActivityModel>(new PolymorpheusComponent(FieldActivityDialogComponent), {
        data: activity,
        label: 'Редактирование',
        size: 'm'
      })
      .subscribe(result => {
        if (result) {
          this.service.update(result).subscribe(id => {
            this.load();
          });
        }
      });
  }

  openCreateDialog() {
    this.dialogs
      .open<FieldActivityModel>(new PolymorpheusComponent(FieldActivityDialogComponent), {
        data: null,
        label: 'Создание',
        size: 'm'
      })
      .subscribe(result => {
        if (result) {
          this.service.create(result.name).subscribe(id => {
            this.load();
          });
        }
      });
  }
} 