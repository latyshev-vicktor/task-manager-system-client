import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FieldActivityModel } from '../models/field-activity/field-activity.model';

@Injectable({ providedIn: 'root' })
export class FieldActivityService {
  private readonly _baseUrl = "/tasks-service/api/sprint";
  private readonly http = inject(HttpClient);
  
  create(name: string | null) : Observable<number> {
    return this.http.post<number>(`${this._baseUrl}`, {name: name});
  }
}