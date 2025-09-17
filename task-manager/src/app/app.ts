import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    MenubarModule, 
    ButtonModule,
    LayoutComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sidebarVisible = false;

  date: Date = new Date();
  items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'About', icon: 'pi pi-info-circle' },
    { label: 'Contact', icon: 'pi pi-envelope' }
  ];
}
