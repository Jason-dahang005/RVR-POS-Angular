import { inject, Injectable } from '@angular/core';
import { CustomersInput, InputResponse, ResponseCustomers } from '../models/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  http = inject(HttpClient)
  api = environment.apiLink

  private customerSource = new BehaviorSubject<any>(null);

  currentCustomer = this.customerSource.asObservable()

  changeCustomer(customers: any){
    this.customerSource.next(customers)
  }

  getAllCustomers(page: number = 1): Observable<ResponseCustomers>{
    return this.http.get<ResponseCustomers>(`${this.api}display-customers?page=${page}`);
  }

  createNewCustomers(data: InputResponse): Observable<InputResponse>{
    return this.http.post<InputResponse>(`${this.api}create-customers`, data);
  }

  updateCustomers(customers: any): Observable<any> {
    return this.http.put<any>(`${this.api}update-customers/${customers.id}`, customers)
  }

}
