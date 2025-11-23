import { inject, Injectable } from "@angular/core";
import { CreateTargetModel, TargetModel } from "../models/target/target.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TargetService {
  private readonly _baseUrl = "/tasks-service/api/target";
  private readonly http = inject(HttpClient);
  
  create(model: CreateTargetModel) : Observable<number> {
    return this.http.post<number>(`${this._baseUrl}`, model);
  }

  update(model: TargetModel) : Observable<number> {
    return this.http.put<number>(`${this._baseUrl}`, model);
  }
}