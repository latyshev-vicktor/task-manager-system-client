import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserShortModel } from '../models/user/user-short.model';
import { UserProfileModel, NotificationSettingsModel } from '../models/user/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _baseUrl = "/autentication-service/api/user";
  private readonly http = inject(HttpClient);

  getShortInformation() : Observable<UserShortModel> {
    return this.http.get<UserShortModel>(`${this._baseUrl}/short-information`);
  }

  getProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(`${this._baseUrl}/profile`);
  }

  updateProfile(profile: Partial<UserProfileModel>): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(`${this._baseUrl}/profile`, profile);
  }

  getNotificationSettings(): Observable<NotificationSettingsModel> {
    return this.http.get<NotificationSettingsModel>(`${this._baseUrl}/notification-settings`);
  }

  updateNotificationSettings(settings: Partial<NotificationSettingsModel>): Observable<NotificationSettingsModel> {
    return this.http.put<NotificationSettingsModel>(`${this._baseUrl}/notification-settings`, settings);
  }
}