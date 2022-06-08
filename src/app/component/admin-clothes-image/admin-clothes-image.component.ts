import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clothes } from 'src/app/models/clothes';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { ClothesService } from 'src/app/services/clothes.service';


@Component({
  selector: 'app-admin-clothes-image',
  templateUrl: './admin-clothes-image.component.html',
  styleUrls: ['./admin-clothes-image.component.css']
})
export class AdminClothesImageComponent implements OnInit {

  apiUrl = "https://localhost:44347/api/";
  clothesDetails:ClothesDetail[]=[];
  clothess: Clothes[]=[];
  clothes : ClothesDetail[]=[];
  imageUrl:string="https://localhost:44347/";

  constructor(
    private clothesService:ClothesService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["clothesId"]) {
        this.getDetailByClothesId(params["clothesId"]);
      }else{
      }
    })
  }

  getDetailByClothesId(clothesId:number){
    this.clothesService.getClothesDetailByClothesId(clothesId).subscribe(response=>{
      this.clothesDetails=response.data;
    })
  }

  delete(clothesDetail:ClothesDetail){
    this.clothesService.delete(clothesDetail).subscribe(response=>{
      this.toastrService.success("Ürün bilgisi silindi!","Başarılı");
    })
  }


}
