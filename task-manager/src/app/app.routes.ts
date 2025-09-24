import { Routes } from '@angular/router';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { LayoutComponent } from './components/layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'sprint-list', pathMatch: 'full' },
      { path: 'sprint-list', component: SprintListComponent },
      // позже добавишь:
      // { path: 'sprint/:id', component: SprintDetailsComponent }
    ],
  }
]