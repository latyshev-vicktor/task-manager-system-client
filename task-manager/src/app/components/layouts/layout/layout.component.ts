import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
  ]
})
export class LayoutComponent {
  sidebarCollapsed = false;
  currentPageTitle = '';

  onToggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}