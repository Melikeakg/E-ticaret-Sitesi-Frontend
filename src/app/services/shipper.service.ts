import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Shipper } from '../models/shipper';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  apiUrl = 'https://localhost:44347/api/';
  constructor(private httpClient:HttpClient) { }

  getAllShippers():Observable<ListResponseModel<Shipper>>{
     return this.httpClient.get<ListResponseModel<Shipper>>(this.apiUrl+"shippers/getall")
  }

  getByshipperId(shipperId:number):Observable<ListResponseModel<Shipper>>{
    let newPath = this.apiUrl+"shippers/getbyshipperid?shipperId="+shipperId;
    return this.httpClient.get<ListResponseModel<Shipper>>(newPath);
  }
}
