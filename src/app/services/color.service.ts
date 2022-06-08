import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44347/api/";
  constructor(private httpClient:HttpClient) { }

  getAllColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"colors/getall")
  }

  getByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl+"colors/getbycolorid?colorId="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/add";
    return this.httpClient.post<ListResponseModel<Color>>(newPath,color);
  }

  update(color:Color):Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/update";
    return this.httpClient.post<ListResponseModel<Color>>(newPath,color);
  }

  delete(color:Color):Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/delete";
    return this.httpClient.post<ListResponseModel<Color>>(newPath,color);
  }

}
