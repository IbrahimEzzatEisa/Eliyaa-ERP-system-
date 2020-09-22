import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataWithRanking, CustomerTypes } from 'app/shared/models';
const API_URL = END_POINTS.customerTypes;

@Injectable({
  providedIn: 'root'
})
export class CustomerTypesService {


  constructor(private http: HttpClient) { }

  create(model: CustomerTypes): Observable<CustomerTypes[]> {
    return this.http.post<CustomerTypes[]>(API_URL, model);
  }
  getAll(): Observable<CustomerTypes[]> {
    return this.http.get<CustomerTypes[]>(API_URL);
  }

  
  get(id: number): Observable<CustomerTypes[]> {
    return this.http.get<CustomerTypes[]>(API_URL + `/${id}`);
  }

  
  update( id: number ,model: CustomerTypes): Observable<DataWithRanking<CustomerTypes>> {
    return this.http.put<DataWithRanking<CustomerTypes>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<CustomerTypes>{
    return this.http.delete<CustomerTypes>(API_URL + `/${id}`);
  }}
