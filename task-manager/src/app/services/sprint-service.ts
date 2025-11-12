import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateSprintModel } from '../models/sprint/sprint.model';

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
}