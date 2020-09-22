import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { SubscriptionTypes, DataWithRanking } from 'app/shared/models';
import { Observable } from 'rxjs';
const API_URL = END_POINTS.subscriptionTypes;

@Injectable({
  providedIn: 'root'
})
export class SubscriptopnTypesService {

  constructor(private http: HttpClient) { }

  create(model: SubscriptionTypes): Observable<SubscriptionTypes[]> {
    return this.http.post<SubscriptionTypes[]>(API_URL, model);
  }
  getAll(): Observable<SubscriptionTypes[]> {
    return this.http.get<SubscriptionTypes[]>(API_URL);
  }

  
  get(id: number): Observable<SubscriptionTypes[]> {
    return this.http.get<SubscriptionTypes[]>(API_URL + `/${id}`);
  }

  update( id: number ,model: SubscriptionTypes): Observable<DataWithRanking<SubscriptionTypes>> {
    return this.http.put<DataWithRanking<SubscriptionTypes>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<SubscriptionTypes>{
    return this.http.delete<SubscriptionTypes>(API_URL + `/${id}`);
  }
}
