import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Clothes } from 'src/app/models/clothes';
import { Color } from 'src/app/models/color';
import { CategoryService } from 'src/app/services/category.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-clothes-update',
  templateUrl: './clothes-update.component.html',
  styleUrls: ['./clothes-update.component.css']
})
export class ClothesUpdateComponent implements OnInit {

  categories : Category[] = [];
  colors : Color[] = [];
  clothess : Clothes[] = [];
  clothes: Clothes;
  clothesUpdateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private clothesService:ClothesService,
    private toastrService:ToastrService,
    private categoryService:CategoryService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createClothesUpdateForm();
    this.getAllCategories();
    this.getAllColors();
    this.getAllClothes();
  }

  createClothesUpdateForm(){
    this.clothesUpdateForm = this.formBuilder.group({
      clothesId:["clothes.clothesId",Validators.required],
      clothesName: ['', Validators.required],
      categoryId: ['', Validators.required],
      colorId: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      unitPrice: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors =response.data;
    })
  }

  getAllClothes(){
    this.clothesService.getAll().subscribe(response=>{
      this.clothess=response.data;
    })
  }



  update(){
    if (this.clothesUpdateForm.valid) {
      let clothesModel=Object.assign({},this.clothesUpdateForm.value);
      this.clothesService.update(clothesModel).subscribe((response=>{
        this.toastrService.success(response.message,"Başarılı");
      }),responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata");
          }
        }
      })

    }else{
      this.toastrService.error("Formunuz eksik","Hata");
    }
  }





}
