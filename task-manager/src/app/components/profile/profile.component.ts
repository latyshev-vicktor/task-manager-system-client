import { UpdatedUserNotificationProfileModel, UpdateUserProfileModel } from './../../models/user/user-profile.model';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiAlertService, TuiButton, TuiError, TuiLoader, TuiTextfield, TuiTitle, TuiCalendar } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiFieldErrorPipe, TuiInputDate, TuiSwitch, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { LucideAngularModule, User, Mail, Phone, Briefcase, Building, Save, Bell } from 'lucide-angular';
import { UserService } from '../../services/user-service';
import { AuthStore } from '../../services/auth.store';
import { catchError, finalize, of, tap } from 'rxjs';
import { UserNotificationProfileService } from '../../services/user-notification-profile-service';
import { TuiDay } from '@taiga-ui/cdk/date-time';

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
    LucideAngularModule,
    TuiCalendar,
    TuiInputDate    
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
  private userNotificationProfileService = inject(UserNotificationProfileService)
  private authStore = inject(AuthStore);
  private alert = inject(TuiAlertService);

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
    id: new FormControl(0, Validators.required),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    birthDay: new FormControl<TuiDay | null>(null, Validators.required),
  });

  notificationSettingsForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    enableEmail: new FormControl(false),
    enableSignalR: new FormControl(false),
  });

  ngOnInit(): void {
    this.loadProfile();
    this.loadNotificationSettings();
  }

  loadProfile(): void {
    this.isLoading.set(true);
    this.userService.getProfile()
      .pipe(
        tap(profile => {
          const birthDateTimestamp = profile.birthDay;
          const actualDateObject = new Date(birthDateTimestamp);
          const year = actualDateObject.getFullYear();
          const month = actualDateObject.getMonth(); 
          const day = actualDateObject.getDate();
          const tuiDay: TuiDay = new TuiDay(year, month, day);
          this.profileForm.patchValue({
            id: profile.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            userName: profile.userName,
            phone: profile.phone,
            birthDay: tuiDay
          });
        }),
        catchError(error => {
          // Если профиль не найден, используем данные из AuthStore
          this.authStore.user$.subscribe(user => {
            if (user) {
              this.profileForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
              });
            }
          });
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
    
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
    this.userNotificationProfileService.getNotificationSettings()
      .pipe(
        tap(settings => {
          this.notificationSettingsForm.patchValue({
            userId: settings.userId,
            id: settings.id,
            enableEmail: settings.enableEmail,
            enableSignalR: settings.enableSignalR,
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
    this.userService.updateProfile(profileData as UpdateUserProfileModel)
    .subscribe(x => {
      this.userService.getShortInformation().subscribe(user => {
        this.authStore.setUser(user);
        this.isSaving.set(false);
        this.alert.open('Профиль успешно сохранен!', {
        label: 'Успешно',
        appearance: 'positive',
      }).subscribe();
      })
    });
  }

  saveNotificationSettings(): void {
    this.isSettingsSaving.set(true);
    const settingsData = this.notificationSettingsForm.getRawValue();
    this.userNotificationProfileService.updateSettings(settingsData as UpdatedUserNotificationProfileModel)
    .subscribe(() => {
      this.isSettingsSaving.set(false);
      this.loadNotificationSettings();
      this.alert.open('Настройки уведомлений успешно сохранены!', {
        label: 'Успешно',
        appearance: 'positive',
      }).subscribe();
    })
  }
}

