import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateTaskModel, TaskModel } from "../models/task/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _baseUrl = "/tasks-service/api/task";
  private readonly http = inject(HttpClient);
  
  create(model: CreateTaskModel): Observable<number> {
    return this.http.post<number>(`${this._baseUrl}`, model);
  }

  update(model: TaskModel): Observable<number> {
    return this.http.put<number>(`${this._baseUrl}`, model);
  }

  complete(id: number) : Observable<void> {
    return this.http.patch<void>(`${this._baseUrl}/${id}/complete`, {})
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${id}`);
  }
}

