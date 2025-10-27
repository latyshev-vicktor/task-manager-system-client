import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";
import { LucideAngularModule, Home, CheckSquare, Folder, Calendar, Users, BarChart3, Settings, ClipboardList } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TuiButton,
    LucideAngularModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  readonly Home = Home;
  readonly CheckSquare = CheckSquare;
  readonly Folder = Folder;
  readonly Calendar = Calendar;
  readonly Users = Users;
  readonly BarChart3 = BarChart3;
  readonly Settings = Settings;
  readonly ClipboardList = ClipboardList;


  navigationItems: NavigationItem[] = [
    {
      path: '/sprint-list',
      label: 'Спринты',
      icon: Home
    },
    {
      path: '/field-activities',
      label: 'Сферы деятельности',
      icon: CheckSquare
    },
    {
      path: '/projects',
      label: 'Проекты',
      icon: Folder,
      badge: 3
    },
    {
      path: '/calendar',
      label: 'Календарь',
      icon: Calendar
    },
    {
      path: '/team',
      label: 'Команда',
      icon: Users
    },
    {
      path: '/reports',
      label: 'Отчеты',
      icon: BarChart3
    }
  ];
}