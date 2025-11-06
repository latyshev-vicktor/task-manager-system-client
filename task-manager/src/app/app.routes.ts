import { FieldActivitiesListComponent } from './components/field-activities/list/field-activities-list.component';
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
      { path: 'field-activities', component: FieldActivitiesListComponent }
    ],
  },
  { path: 'login', component: LoginComponent }
]