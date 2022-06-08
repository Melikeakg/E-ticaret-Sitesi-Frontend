import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import {HttpClient} from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  apiUrl = "https://localhost:44347/api/";

  getAllCategories():Observable<ListResponseModel<Category>>{
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"categories/getall");
  }

  getByCategoryId(categoryId:number):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl+"categories/getbycategoryid?categoryId="+categoryId;
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }

  add(category:Category):Observable<ListResponseModel<Category>>{
    let newPath=this.apiUrl+"categories/add";
    return this.httpClient.post<ListResponseModel<Category>>(newPath,category);
  }

  update(category:Category):Observable<ListResponseModel<Category>>{
    let newPath=this.apiUrl+"categories/update";
    return this.httpClient.post<ListResponseModel<Category>>(newPath,category);
  }

  delete(category:Category):Observable<ListResponseModel<Category>>{
    let newPath=this.apiUrl+"categories/delete";
    return this.httpClient.post<ListResponseModel<Category>>(newPath,category);
  }
}
