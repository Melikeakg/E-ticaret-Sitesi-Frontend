import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clothes } from '../models/clothes';
import { ClothesDetail } from '../models/clothesDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  apiUrl = 'https://localhost:44347/api/clothes/';
  constructor(private httpClient: HttpClient) {}

  getClothesDetails(): Observable<ListResponseModel<ClothesDetail>> {
    let newPath = this.apiUrl + 'getclothesdetails';
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(newPath);
  }

  getClothesDetailByColorId(colorId:number):Observable<ListResponseModel<ClothesDetail>>{
    let newPath=this.apiUrl+"getclothesdetailbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(newPath);
  }

  getClothesDetailByCategoryId(categoryId:number):Observable<ListResponseModel<ClothesDetail>>{
    let newPath=this.apiUrl+"getclothesdetailbycategoryId?categoryId="+categoryId;
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(newPath);
  }

  getClothesDetailByCategoryAndColorId(categoryId:number,colorId:number):
  Observable<ListResponseModel<ClothesDetail>>{
    let newPath=this.apiUrl+"getclothesdetailbycategoryandcolorid?categoryId="+categoryId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(newPath);
  }

  getClothesDetailByClothesId(clothesId:number):Observable<ListResponseModel<ClothesDetail>>{
    let newPath =this.apiUrl+"getclothesdetailbyclothesid?clothesId="+clothesId;
    return this.httpClient.get<ListResponseModel<ClothesDetail>>(newPath);
  }

  add(clothes:Clothes):Observable<ListResponseModel<Clothes>>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ListResponseModel<Clothes>>(newPath,clothes);
  }

  update(clothes:Clothes):Observable<ListResponseModel<Clothes>>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ListResponseModel<Clothes>>(newPath,clothes);
  }

  delete(clothesDetail:ClothesDetail):Observable<ListResponseModel<Clothes>>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<ListResponseModel<Clothes>>(newPath,clothesDetail);
  }

  getAll(){
    let newPath = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Clothes>>(newPath);
  }
}
