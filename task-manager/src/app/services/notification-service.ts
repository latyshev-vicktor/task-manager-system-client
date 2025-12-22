import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel } from '../models/notification/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _baseUrl = '/notifications-service/api/notification';
  private readonly http = inject(HttpClient);

  getAll(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this._baseUrl}`);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this._baseUrl}/unread-count`);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/read-all`, {});
  }
}

