import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customers, DataWithRanking, AllCustomers } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.customers;
const API_URL_filter = END_POINTS.customersFiltered;
const API_URL_Pdf = END_POINTS.customersExport;
const API_URL_Excel = END_POINTS.customersExporExcel;




@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  create(model: Customers): Observable<Customers> {
    return this.http.post<Customers>(API_URL, model);
  }
  getAll(): Observable<AllCustomers[]> {
    return this.http.get<AllCustomers[]>(API_URL);
  }

  getAllCustomerFilter(): Observable<AllCustomers[]> {
    return this.http.get<AllCustomers[]>(API_URL_filter);
  }
  get(id: number): Observable<AllCustomers> {
    return this.http.get<AllCustomers>(API_URL + `/${id}`);
  }


   getPDF(name:string): Observable<Blob> {   
    let params = new HttpParams();
    params = params.append('type' , name);
    //const options = { responseType: 'blob' }; there is no use of this
        // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
        return this.http.get(API_URL_Pdf,   { params:params ,responseType: 'blob' });
    }


    getExcel(name:string): Observable<Blob> {   
      let params = new HttpParams();
      params = params.append('type' , name);
      //const options = { responseType: 'blob' }; there is no use of this
          // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
          return this.http.get(API_URL_Excel,   { params:params ,responseType: 'blob' });
      }
  

  update( id: number ,model: Customers): Observable<Customers> {
    return this.http.put<Customers>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Customers>{
    return this.http.delete<Customers>(API_URL + `/${id}`);
  }
}
