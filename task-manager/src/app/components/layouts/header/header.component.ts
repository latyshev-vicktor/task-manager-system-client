import { CommonModule } from "@angular/common";
import { Component, computed, EventEmitter, inject, Input, Output, output, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TuiButton, TuiScrollbar } from "@taiga-ui/core";
import { LucideAngularModule, Menu, Search, Bell, Plus, ChevronDown, ChevronRight, User, Settings, LogOut } from 'lucide-angular';
import { AuthStore } from "../../../services/auth.store";
import { NotificationStore } from "../../../services/notification.store";
import { NotificationModel } from "../../../models/notification/notification.model";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TuiButton,
    TuiScrollbar,
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle = '';
  @Output() menuToggle = new EventEmitter<void>();

  readonly Menu = Menu;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly Plus = Plus;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;
  readonly User = User;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  breadcrumbs: string[] = []; // Можно будет заполнить через роутер
  
  notifications: NotificationModel[] = [];
  unreadCount = 0;
  isNotificationDropdownOpen = false;
  isUserMenuOpen = false;
  
  @ViewChild('notificationWrapper', { static: false }) notificationWrapper?: ElementRef;
  @ViewChild('userMenuWrapper', { static: false }) userMenuWrapper?: ElementRef;
  
  private destroy$ = new Subject<void>();
  private auth = inject(AuthStore);
  private notificationStore = inject(NotificationStore);
  private router = inject(Router);
  
  readonly user$ = this.auth.user$;
  readonly notifications$ = this.notificationStore.notifications$;
  readonly unreadCount$ = this.notificationStore.unreadCount$;

  ngOnInit(): void {
    // Загружаем уведомления при инициализации
    this.notificationStore.loadNotifications();
    
    // Подписываемся на изменения уведомлений
    this.notifications$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(notifications => {
      this.notifications = notifications;
    });
    
    // Подписываемся на изменения счетчика непрочитанных
    this.unreadCount$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.unreadCount = count;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  toggleNotificationDropdown(): void {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    if (this.isNotificationDropdownOpen) {
      // Обновляем список уведомлений при открытии
      this.notificationStore.loadNotifications();
    }
  }

  onNotificationClick(notification: NotificationModel): void {
    if (!notification.isRead) {
      this.notificationStore.markAsRead(notification.id);
    }
  }

  markAllAsRead(): void {
    this.notificationStore.markAllAsRead();
  }

  formatDate(date: Date): string {
    const notificationDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - notificationDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'только что';
    } else if (diffMins < 60) {
      return `${diffMins} мин. назад`;
    } else if (diffHours < 24) {
      return `${diffHours} ч. назад`;
    } else if (diffDays < 7) {
      return `${diffDays} дн. назад`;
    } else {
      return notificationDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.isUserMenuOpen = false;
  }

  logout(): void {
    this.auth.logout();
    this.isUserMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isNotificationDropdownOpen && 
        this.notificationWrapper && 
        !this.notificationWrapper.nativeElement.contains(event.target)) {
      this.isNotificationDropdownOpen = false;
    }
    
    if (this.isUserMenuOpen && 
        this.userMenuWrapper && 
        !this.userMenuWrapper.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }
}