import { Routes } from '@angular/router';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'sprint-list', pathMatch: 'full' },
      { path: 'sprint-list', component: SprintListComponent },
    ],
  },
  { path: 'login', component: LoginComponent }
]