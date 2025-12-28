import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiAlertService, TuiButton, TuiError, TuiLoader, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, TuiSwitch, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { LucideAngularModule, User, Mail, Phone, Briefcase, Building, Save, Bell } from 'lucide-angular';
import { UserService } from '../../services/user-service';
import { AuthStore } from '../../services/auth.store';
import { UserProfileModel, NotificationSettingsModel } from '../../models/user/user-profile.model';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiTitle,
    TuiCardLarge,
    TuiHeader,
    TuiSwitch,
    TuiError,
    TuiFieldErrorPipe,
    TuiLoader,
    LucideAngularModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле необходимо для заполнения',
      email: 'Не корректно заполненный email',
    }),
  ],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authStore = inject(AuthStore);
  private alerts = inject(TuiAlertService);

  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Briefcase = Briefcase;
  readonly Building = Building;
  readonly Save = Save;
  readonly Bell = Bell;

  isLoading = signal(false);
  isSaving = signal(false);
  isSettingsLoading = signal(false);
  isSettingsSaving = signal(false);

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    position: new FormControl(''),
    department: new FormControl(''),
  });

  notificationSettingsForm = new FormGroup({
    emailEnabled: new FormControl(false),
    signalREnabled: new FormControl(false),
    taskAssigned: new FormControl(false),
    taskCompleted: new FormControl(false),
    taskUpdated: new FormControl(false),
    sprintCreated: new FormControl(false),
    sprintUpdated: new FormControl(false),
    commentAdded: new FormControl(false),
  });

  ngOnInit(): void {
    this.loadProfile();
    //this.loadNotificationSettings();
  }

  loadProfile(): void {
    this.isLoading.set(true);
    // this.userService.getProfile()
    //   .pipe(
    //     tap(profile => {
    //       this.profileForm.patchValue({
    //         firstName: profile.firstName,
    //         lastName: profile.lastName,
    //         email: profile.email,
    //         userName: profile.userName,
    //         phone: profile.phone || '',
    //         position: profile.position || '',
    //         department: profile.department || '',
    //       });
    //     }),
    //     catchError(error => {
    //       // Если профиль не найден, используем данные из AuthStore
    //       this.authStore.user$.subscribe(user => {
    //         if (user) {
    //           this.profileForm.patchValue({
    //             firstName: user.firstName,
    //             lastName: user.lastName,
    //             email: user.email,
    //             userName: user.userName,
    //           });
    //         }
    //       });
    //       return of(null);
    //     }),
    //     finalize(() => this.isLoading.set(false))
    //   )
    //   .subscribe();
    
    // Временно загружаем данные из AuthStore
    this.authStore.user$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
        });
      }
      this.isLoading.set(false);
    });
  }

  loadNotificationSettings(): void {
    this.isSettingsLoading.set(true);
    this.userService.getNotificationSettings()
      .pipe(
        tap(settings => {
          this.notificationSettingsForm.patchValue({
            emailEnabled: settings.emailEnabled,
            signalREnabled: settings.signalREnabled,
            taskAssigned: settings.taskAssigned,
            taskCompleted: settings.taskCompleted,
            taskUpdated: settings.taskUpdated,
            sprintCreated: settings.sprintCreated,
            sprintUpdated: settings.sprintUpdated,
            commentAdded: settings.commentAdded,
          });
        }),
        catchError(() => {
          // Если настройки не найдены, используем значения по умолчанию
          return of(null);
        }),
        finalize(() => this.isSettingsLoading.set(false))
      )
      .subscribe();
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const profileData = this.profileForm.getRawValue();
    
    // this.userService.updateProfile(profileData)
    //   .pipe(
    //     tap(updatedProfile => {
    //       // Обновляем данные в AuthStore
    //       this.authStore.setUser({
    //         userId: updatedProfile.userId,
    //         createdDate: updatedProfile.createdDate,
    //         userName: updatedProfile.userName,
    //         firstName: updatedProfile.firstName,
    //         lastName: updatedProfile.lastName,
    //         email: updatedProfile.email,
    //       });

    //       this.alerts.open('Профиль успешно обновлен', {
    //         label: 'Успешно',
    //         appearance: 'positive',
    //       }).subscribe();
    //     }),
    //     catchError(error => {
    //       const errorMessage = error?.error?.message || 'Ошибка при обновлении профиля';
    //       this.alerts.open(errorMessage, {
    //         label: 'Ошибка',
    //         appearance: 'negative',
    //       }).subscribe();
    //       return of(null);
    //     }),
    //     finalize(() => this.isSaving.set(false))
    //   )
    //   .subscribe();
  }

  saveNotificationSettings(): void {
    this.isSettingsSaving.set(true);
    const settingsData = this.notificationSettingsForm.getRawValue();
    
    // this.userService.updateNotificationSettings(settingsData)
    //   .pipe(
    //     tap(() => {
    //       this.alerts.open('Настройки уведомлений успешно обновлены', {
    //         label: 'Успешно',
    //         appearance: 'positive',
    //       }).subscribe();
    //     }),
    //     catchError(error => {
    //       const errorMessage = error?.error?.message || 'Ошибка при обновлении настроек';
    //       this.alerts.open(errorMessage, {
    //         label: 'Ошибка',
    //         appearance: 'negative',
    //       }).subscribe();
    //       return of(null);
    //     }),
    //     finalize(() => this.isSettingsSaving.set(false))
    //   )
    //   .subscribe();
  }
}

