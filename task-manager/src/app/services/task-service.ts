import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateTaskModel, TaskModel } from "../models/task/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _baseUrl = "/tasks-service/api/task";
  private readonly http = inject(HttpClient);
  
  create(model: CreateTaskModel): Observable<string> {
    return this.http.post<string>(`${this._baseUrl}`, model);
  }

  update(model: TaskModel): Observable<string> {
    return this.http.put<string>(`${this._baseUrl}`, model);
  }

  complete(id: string) : Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/${id}/complete`, {})
  }

  setCreatedStatus(id: string) : Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/${id}/set-created`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${id}`);
  }
}

