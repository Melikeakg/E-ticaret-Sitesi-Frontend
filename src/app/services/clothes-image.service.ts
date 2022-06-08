import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothesImage } from '../models/clothesImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ClothesImageService {

  apiUrl = "https://localhost:44347/api/";
  imgUrl = "https://localhost:44347";
  constructor(private httpClient:HttpClient) { }

  getAllClothesImages():Observable<ListResponseModel<ClothesImage>>{
    return this.httpClient.get<ListResponseModel<ClothesImage>>(this.apiUrl+"clothes/getall");
  }

  getImageByClothesId(clothesId:number):Observable<ListResponseModel<ClothesImage>>{
    let newPath = this.apiUrl+"getimagebyclothesid?clothesId="+clothesId;
    return this.httpClient.get<ListResponseModel<ClothesImage>>(this.apiUrl);
  }

  getImagePath(imagePath:string){
    this.imgUrl+imagePath;
  }

  add(file:File, clothesId:number):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("imageFile", file);
    formData.append("clothesId", clothesId.toString())
    return this.httpClient.post<ResponseModel>(this.apiUrl+"clothesimage/add", formData);
  }


}
