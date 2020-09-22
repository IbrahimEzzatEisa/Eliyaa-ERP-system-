import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Cities } from 'app/shared/models/citites.model';
import { Observable } from 'rxjs';
import { DataWithRanking } from 'app/shared/models/data-with-ranking.model';
const API_URL = END_POINTS.cities;

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  create(model: Cities): Observable<Cities[]> {
    return this.http.post<Cities[]>(API_URL, model);
  }
  getAll(): Observable<Cities[]> {
    return this.http.get<Cities[]>(API_URL);
  }

  
  get(id: number): Observable<Cities[]> {
    return this.http.get<Cities[]>(API_URL + `/${id}`);
  }

  update( id: number ,model: Cities): Observable<DataWithRanking<Cities>> {
    return this.http.put<DataWithRanking<Cities>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Cities>{
    return this.http.delete<Cities>(API_URL + `/${id}`);
  }


}
