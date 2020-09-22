import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users, DataWithRanking, AllUser } from 'app/shared/models';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.users;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  create(model: Users): Observable<Users> {
    return this.http.post<Users>(API_URL, model);
  }
  getAll(): Observable<AllUser[]> {
    return this.http.get<AllUser[]>(API_URL);
  }

  get(id: number): Observable<Users[]> {
    return this.http.get<Users[]>(API_URL + `/${id}`);
  }

  update( model: Users): Observable<Users> {
    return this.http.put<Users>(API_URL , model);
  }
  delete(id): Observable<Users>{
    return this.http.delete<Users>(API_URL + `/${id}`);
  }
}
