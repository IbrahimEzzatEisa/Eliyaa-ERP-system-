import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionStatus, DataWithRanking } from 'app/shared/models';
const API_URL = END_POINTS.subscriptionStatus;

@Injectable({
  providedIn: 'root'
})
export class SubscriptopnStatusService {

  constructor(private http: HttpClient) { }

  create(model: SubscriptionStatus): Observable<SubscriptionStatus[]> {
    return this.http.post<SubscriptionStatus[]>(API_URL, model);
  }
  getAll(): Observable<SubscriptionStatus[]> {
    return this.http.get<SubscriptionStatus[]>(API_URL);
  }

  
  get(id: number): Observable<SubscriptionStatus[]> {
    return this.http.get<SubscriptionStatus[]>(API_URL + `/${id}`);
  }

  update( id: number ,model: SubscriptionStatus): Observable<DataWithRanking<SubscriptionStatus>> {
    return this.http.put<DataWithRanking<SubscriptionStatus>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<SubscriptionStatus>{
    return this.http.delete<SubscriptionStatus>(API_URL + `/${id}`);
  }}
