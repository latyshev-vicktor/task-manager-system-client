import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_API_GATEWAY = 'https://localhost:7280';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection?: signalR.HubConnection;
  private eventSubject = new BehaviorSubject<any | null>(null);

  public events$: Observable<any | null> = this.eventSubject.asObservable();
  public connectionState$ = new BehaviorSubject<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected
  );

  public startConnection(accessToken: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_API_GATEWAY}/tasks-service/sprint-hub`, {
        accessTokenFactory: () => accessToken,
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents
      }).withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();
    
    this.hubConnection.onreconnecting(() => {
      this.connectionState$.next(signalR.HubConnectionState.Reconnecting);
    });

    this.hubConnection.onreconnected(() => {
      this.connectionState$.next(signalR.HubConnectionState.Connected);
    });

    this.hubConnection.onclose(() => {
      this.connectionState$.next(signalR.HubConnectionState.Disconnected);
    });

    return this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        this.connectionState$.next(signalR.HubConnectionState.Connected);
        this.registerHandlers();
      })
      .catch(err => {
        console.error('SignalR Connection Error: ', err);
        throw err;
      });
  }

  private registerHandlers(): void {
    this.hubConnection?.on('SprintChangeStatus', (sprintStatusChanged: any) => {
      console.log('Получено уведомление об изменении статуса спринта:', sprintStatusChanged);
      this.eventSubject.next(sprintStatusChanged);
    });
  }

  public stopConnection(): Promise<void> {
    return this.hubConnection?.stop() ?? Promise.resolve();
  }
}