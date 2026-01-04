import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdatedUserNotificationProfileModel, UserNotificationProfileModel } from "../models/user/user-profile.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserNotificationProfileService { 
  private readonly _baseUrl = '/notifications-service/api/UserNotificationProfile';
  private readonly http = inject(HttpClient);
  
  getNotificationSettings(): Observable<UserNotificationProfileModel> {
    return this.http.get<UserNotificationProfileModel>(`${this._baseUrl}/user-notification-settings`);
  }
  
  updateSettings(model: UpdatedUserNotificationProfileModel) : Observable<void> {
    return this.http.put<void>(`${this._baseUrl}`, model);
  }
}