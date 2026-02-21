import { inject, Injectable } from "@angular/core";
import { CreateTargetModel, TargetModel } from "../models/target/target.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TargetService {
  private readonly _baseUrl = "/tasks-service/api/target";
  private readonly http = inject(HttpClient);
  
  create(model: CreateTargetModel) : Observable<string> {
    return this.http.post<string>(`${this._baseUrl}`, model);
  }

  update(model: TargetModel) : Observable<string> {
    return this.http.put<string>(`${this._baseUrl}`, model);
  }
}