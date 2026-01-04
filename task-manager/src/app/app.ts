import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./components/layouts/layout/layout.component";
import { TuiRoot } from '@taiga-ui/core';
import { AuthService } from './services/auth-service';
import { SignalRService } from './services/signalR-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRoot,
    LayoutComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  title = 'task-manager';
  authService = inject(AuthService);
  signalRService = inject(SignalRService);

  ngOnInit(): void {
    this.authService.tokenChanges$.subscribe(token => {
      if(token) {
        this.signalRService.startConnection(token);
      }
    })
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }
}
