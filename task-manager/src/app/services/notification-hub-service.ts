import * as signalR from '@microsoft/signalr';
import { Injectable, inject } from '@angular/core';
import { NotificationStore } from './notification.store';

export const API_URL = 'https://localhost:7280/notifications-service';

@Injectable({ providedIn: 'root' })
export class NotificationHubService {
  private hubConnection?: signalR.HubConnection;
  private notificationStore = inject(NotificationStore)

  connect(accessToken: string) {
    if (this.hubConnection) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/hubs/notification`, {
        accessTokenFactory: () => accessToken
      })
      .withAutomaticReconnect()
      .build();

    this.registerHandlers();

    this.hubConnection.start()
      .then(() => console.log('🔔 SignalR connected'))
      .catch(err => console.error('SignalR error', err));
  }

  private registerHandlers() {
    this.hubConnection?.on('Receive', (notification) => {
      this.notificationStore.addNotification(notification);
    });
  }

  disconnect() {
    this.hubConnection?.stop();
    this.hubConnection = undefined;
  }
}