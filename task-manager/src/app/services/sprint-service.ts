import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateSprintModel, SprintModel } from '../models/sprint/sprint.model';
import { TargetModel } from '../models/target/target.model';
import { ThumbsDown } from 'lucide-angular';
import { SprintWeekModel } from '../models/sprint-week/sprint-week.model';

@Injectable({ providedIn: 'root' })
export class SprintService {
  private readonly _baseUrl = "/tasks-service/api/sprint";
  private readonly http = inject(HttpClient);
  
  create(model: CreateSprintModel) : Observable<number> {
    return this.http.post<number>(`${this._baseUrl}`, model);
  }

  search(filter: any) {
    return this.http.post<any>(`${this._baseUrl}/search`, filter);
  }

  getById(id: number) : Observable<SprintModel | null> {
    return this.http.get<SprintModel | null>(`${this._baseUrl}/${id}`);
  }

  getTargetsBySprintId(sprintId: number) : Observable<TargetModel[]> {
    return this.http.get<TargetModel[] | []>(`${this._baseUrl}/${sprintId}/targets`)
  }

  getWeeksBySprintId(sprintId: number) : Observable<SprintWeekModel[]> {
    return this.http.get<SprintWeekModel[] | []>(`${this._baseUrl}/${sprintId}/weeks`)
  }

  update(model: Partial<SprintModel>): Observable<number> {
    return this.http.put<number>(`${this._baseUrl}`, model);
  }

  startSprint(id: number) : Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/${id}/start-sprint`, {});
  }
}