import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Clothes } from 'src/app/models/clothes';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { Color } from 'src/app/models/color';
import { CategoryService } from 'src/app/services/category.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  clothess :Clothes[]=[];
  colors:Color[]=[];
  categories:Category[]=[];
  categoryId:number=0;
  colorId:number=0;
  clothesDetails : ClothesDetail[]=[];
  dataLoaded = false;

  imageUrl : string = "https://localhost:44347/";

  constructor(private clothesService:ClothesService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private categoryService:CategoryService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params=>{
      if(params["clothesId"]){
      }
      else if (params["categoryId"]) {
        this.getClothesDetailByCategoryId(params["categoryId"]);
      }else if(params["colorId"]){
        this.getClothesDetailByColorId(params["colorId"]);
      }
    }))
    this.getClothesDetails();

    this.getAllColors();
    this.getAllCategories();
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories=response.data;
    })
  }



  getClothesDetails(){
    return this.clothesService.getClothesDetails().subscribe(response=>{
      this.clothesDetails=response.data;
    })
  }


  getClothesDetailByCategoryId(categoryId:number){
    return this.clothesService.getClothesDetailByCategoryId(categoryId).subscribe(response=>{
      this.clothesDetails=response.data;
    })
  }

  getClothesDetailByColorId(colorId:number){
    return this.clothesService.getClothesDetailByColorId(colorId).subscribe(response=>{
      this.clothesDetails=response.data;
    })
  }

  getClothesDetailByCategoryAndColorId(categoryId:number,colorId:number){
    if (this.categoryId==0 && this.colorId==0) {
      this.getClothesDetails();
    }
    else if (this.categoryId==0) {
      this.getClothesDetailByColorId(colorId);
    }
    else if(this.colorId==0){
      this.getClothesDetailByCategoryId(categoryId);
    }
    else {
      this.clothesService.getClothesDetailByCategoryAndColorId(categoryId,colorId).subscribe(response=>{
        this.clothesDetails=response.data;
      })
    }
  }

  reset() {
    this.categoryId = 0;
    this.colorId = 0;
  }

}
