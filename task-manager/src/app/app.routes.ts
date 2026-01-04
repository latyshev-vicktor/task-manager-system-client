import { FieldActivitiesListComponent } from './components/field-activities/list/field-activities-list.component';
import { Routes } from '@angular/router';
import { SprintListComponent } from './components/sprint/sprint-list/sprint-list.component';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { SprintPageComponent } from './components/sprint/view/page/sprint-page.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'sprint-list', pathMatch: 'full' },
      { path: 'sprint-list', component: SprintListComponent },
      { path: 'sprint/:id', component: SprintPageComponent},
      { path: 'field-activities', component: FieldActivitiesListComponent },
      { path: 'profile', component: ProfileComponent }
    ],
  },
  { path: 'login', component: LoginComponent }
]