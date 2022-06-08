import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { OperationClaim } from '../models/operationClaim';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44347/api/users/';
  constructor(private httpClient : HttpClient,
    private localStorageService:LocalStorageService) { }

  getById(userId:number):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getbyid?userId="+userId);
  }

  getClaimByUserId(userId:number):Observable<SingleResponseModel<OperationClaim>>{
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(this.apiUrl+"getclaimbyuserid?userId="+userId);
  }

  getAll():Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl+"getall");
  }

  getToken():string | null{
    return this.localStorageService.getItem("token");
  }
}
