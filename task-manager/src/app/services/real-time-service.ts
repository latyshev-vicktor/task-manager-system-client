import { SprintModel } from './../models/sprint/sprint.model';
import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

const BASE_API_URL = 'https://localhost:7280';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private hubConnection!: signalR.HubConnection;

  private sprintStatusUpdated$ = new Subject<{ sprint: SprintModel }>();

  private connectionState$ = new BehaviorSubject<'connected' | 'disconnected'>('disconnected');

  constructor() {}

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_API_URL}/tasks-service/sprint-notification-hub`, {
        accessTokenFactory: () => localStorage.getItem('access_token') ?? '',
        transport: signalR.HttpTransportType.WebSockets
      }).withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => 2000
      })
      .build();

    this.registerHandlers();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR подключен!');
        this.connectionState$.next('connected');
      })
      .catch(err => console.error('SignalR ошибка:', err));
  }

  private registerHandlers() {
    this.hubConnection.on('SprintStatusUpdated', sprintModel => {
      this.sprintStatusUpdated$.next({ sprint: sprintModel});
    });
  }

  onSprintUpdated() {
    return this.sprintStatusUpdated$.asObservable();
  }

  connectionState() {
    return this.connectionState$.asObservable();
  }
}