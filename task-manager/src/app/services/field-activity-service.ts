import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FieldActivityModel } from '../models/field-activity/field-activity.model';

@Injectable({ providedIn: 'root' })
export class FieldActivityService {
  private readonly _baseUrl = "/tasks-service/api/fieldActivity";
  private readonly http = inject(HttpClient);

  getMy() : Observable<FieldActivityModel[]> {
    return this.http.get<FieldActivityModel[]>(`${this._baseUrl}/my`);
  }

  create(name: string | null) : Observable<number> {
    return this.http.post<number>(`${this._baseUrl}`, {name: name});
  }

  update(model: FieldActivityModel) : Observable<number> {
    return this.http.put<number>(`${this._baseUrl}`, model);
  }

  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${id}`);
  }
}