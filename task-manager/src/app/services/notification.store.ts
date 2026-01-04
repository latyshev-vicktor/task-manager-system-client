import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { NotificationModel } from '../models/notification/notification.model';
import { NotificationService } from './notification-service';
import { tap, catchError, of } from 'rxjs';

interface NotificationState {
  notifications: NotificationModel[];
  unreadCount: number;
  isLoading: boolean;
}

const store = createStore(
  { name: 'notifications' },
  withProps<NotificationState>({
    notifications: [],
    unreadCount: 0,
    isLoading: false
  })
);

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  private notificationService = inject(NotificationService);

  notifications$ = store.pipe(select(state => state.notifications));
  unreadCount$ = store.pipe(select(state => state.unreadCount));
  isLoading$ = store.pipe(select(state => state.isLoading));

  get snapshot() {
    return store.getValue();
  }

  loadNotifications() {
    store.update(state => ({ ...state, isLoading: true }));
    
    this.notificationService.getAll().pipe(
      tap(notifications => {
        const unreadCount = notifications.filter(n => !n.isRead).length;
        store.update(state => ({
          ...state,
          notifications,
          unreadCount,
          isLoading: false
        }));
      }),
      catchError(() => {
        store.update(state => ({ ...state, isLoading: false }));
        return of([]);
      })
    ).subscribe();
  }

  loadUnreadCount() {
    this.notificationService.getUnreadCount().pipe(
      tap(count => {
        store.update(state => ({ ...state, unreadCount: count }));
      }),
      catchError(() => of(0))
    ).subscribe();
  }

  addNotification(notification: NotificationModel) {
    store.update(state => {
      const notifications = [notification, ...state.notifications];
      const unreadCount = notifications.filter(n => !n.isRead).length;
      return {
        ...state,
        notifications,
        unreadCount
      };
    });
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).pipe(
      tap(() => {
        store.update(state => {
          const notifications = state.notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          );
          const unreadCount = notifications.filter(n => !n.isRead).length;
          return {
            ...state,
            notifications,
            unreadCount
          };
        });
      }),
      catchError(() => of(null))
    ).subscribe();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().pipe(
      tap(() => {
        store.update(state => {
          const notifications = state.notifications.map(n => ({ ...n, isRead: true }));
          return {
            ...state,
            notifications,
            unreadCount: 0
          };
        });
      }),
      catchError(() => of(null))
    ).subscribe();
  }
}



