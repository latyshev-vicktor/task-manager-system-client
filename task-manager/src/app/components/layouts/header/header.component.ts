import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, output } from "@angular/core";
import { TuiButton } from "@taiga-ui/core";
import { LucideAngularModule, Menu, Search, Bell, Plus, ChevronDown, ChevronRight, User } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TuiButton,
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() pageTitle = 'Dashboard';
  @Output() menuToggle = new EventEmitter<void>();

  readonly Menu = Menu;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly Plus = Plus;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;
  readonly User = User;

  breadcrumbs: string[] = []; // Можно будет заполнить через роутер
  notificationCount = 5;
  
  currentUser = {
    name: 'Иван Петров',
    role: 'Менеджер проектов'
  };

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  getUserInitials(name: string): string {
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}