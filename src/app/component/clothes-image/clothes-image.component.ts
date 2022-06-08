import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clothes } from 'src/app/models/clothes';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { ClothesImage } from 'src/app/models/clothesImage';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ClothesImageService } from 'src/app/services/clothes-image.service';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothes-image',
  templateUrl: './clothes-image.component.html',
  styleUrls: ['./clothes-image.component.css']
})
export class ClothesImageComponent implements OnInit {

  apiUrl = "https://localhost:44347/api/";
  clothesImages : ClothesImage[]=[];
  clothesDetails:ClothesDetail[]=[];
  clothes : Clothes[]=[];
  imageUrl:string="https://localhost:44347/";
  clothesImagePaths :string[]=[];
  constructor(private clothesImageService:ClothesImageService,
    private clothesService:ClothesService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService,
    private authService:AuthService,
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

  addToCart(clothesDetail:ClothesDetail){
    if (this.authService.isAuthenticated()) {
      this.cartService.addToCart(clothesDetail);
      this.toastrService.success("Sepete eklendi.", clothesDetail.clothesName);
    }else{
      this.toastrService.info("Sepete ekleyebilmek için giriş yapmanız gerekir.", "Bilgi");
      this.router.navigate(["login"]);
    }

  }

}
