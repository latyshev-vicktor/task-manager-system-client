import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { UserShortModel } from '../models/user/user-short.model';
import { AuthService } from './auth-service';
import { UserService } from './user-service';
import { tap } from 'rxjs';
import { NotificationHubService } from './notification-hub-service';

interface AuthState {
  accessToken: string | null;
  user: UserShortModel | null;
  isAuthenticated: boolean;
}

const store = createStore(
  { name: 'auth' },
  withProps<AuthState>({
    accessToken: null,
    user: null,
    isAuthenticated: false
  })
);

export const persist = persistState(store, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private notificationHub = inject(NotificationHubService);

  auth$ = store.pipe(select(state => state)); // реактивный поток
  user$ = store.pipe(select(state => state.user));
  isAuthenticated$ = store.pipe(select(state => state.isAuthenticated));

  get snapshot() {
    return store.getValue();
  }

  login(email: string | null, password: string | null) {
    return this.authService.login(email, password).pipe(
      tap(res => {
        store.update(state => ({
          ...state,
          accessToken: res.accessToken,
          isAuthenticated: true
        }));

        this.notificationHub.connect(res.accessToken);

        // подгружаем юзера
        this.userService.getShortInformation().subscribe(user => {
          store.update(s => ({ ...s, user }));
        });
      })
    );
  }

  setUser(user: UserShortModel) {
    store.update(state => ({ 
      ...state, 
      user }));
  }

  logout() {
    this.authService.logout();
    store.reset();
  }
}