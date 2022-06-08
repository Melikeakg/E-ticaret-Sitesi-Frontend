import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44347/api/';
  constructor(private httpClient: HttpClient) {}

  getAllCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl+"customers/getall");
  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+"customers/getbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  add(customer:Customer):Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+"customers/add";
    return this.httpClient.post<ListResponseModel<Customer>>(newPath,customer);
  }


}
