import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./components/layouts/layout/layout.component";
import { TuiRoot } from '@taiga-ui/core';
import { AuthService } from './services/auth-service';
import { NotificationHubService } from './services/notification-hub-service';

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
export class App implements OnInit {
  title = 'task-manager';
  private authService = inject(AuthService);
  private notificationHub = inject(NotificationHubService);

  ngOnInit(): void {
    const token = this.authService.getAccessToken();
    if (token) {
      this.notificationHub.connect(token);
    }
  }
}
