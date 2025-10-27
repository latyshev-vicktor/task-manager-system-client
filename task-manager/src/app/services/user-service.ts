import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserShortModel } from '../models/user/user-short.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _baseUrl = "/autentication-service/api/user";
  private readonly http = inject(HttpClient);

  getShortInformation() : Observable<UserShortModel> {
    return this.http.get<UserShortModel>(`${this._baseUrl}/short-information`);
  }
}