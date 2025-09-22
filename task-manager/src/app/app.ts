import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./components/layouts/layout/layout.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LayoutComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'task-manager';
}
