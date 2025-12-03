import { CommonModule } from "@angular/common";
import { Component, computed, EventEmitter, inject, Input, Output, output } from "@angular/core";
import { TuiButton } from "@taiga-ui/core";
import { LucideAngularModule, Menu, Search, Bell, Plus, ChevronDown, ChevronRight, User } from 'lucide-angular';
import { AuthStore } from "../../../services/auth.store";

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
  @Input() pageTitle = '';
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

  private auth = inject(AuthStore);
  readonly user$ = this.auth.user$;

  onMenuToggle(): void {
    this.menuToggle.emit();
  }
}