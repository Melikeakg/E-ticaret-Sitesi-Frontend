import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { CategoryService } from 'src/app/services/category.service';
import { ClothesImageService } from 'src/app/services/clothes-image.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-clothes-add',
  templateUrl: './clothes-add.component.html',
  styleUrls: ['./clothes-add.component.css'],
})
export class ClothesAddComponent implements OnInit {
  clothesAddForm: FormGroup;
  categories:Category[]=[];
  colors : Color[]=[];
  categoryId=0;

  filePaths:string[]=[];
  clothesImageForm : FormGroup;
  clothesImages : File[]=[];
  constructor(private formBuilder: FormBuilder,
    private clothesService:ClothesService,
    private toastrService:ToastrService,
    private categoryService:CategoryService,
    private colorService:ColorService,
    private clothesImageService:ClothesImageService) {}

  ngOnInit(): void {
    this.createClothesAddForm();
    this.getAllCategories();
    this.getAllColors();
  }

  createClothesAddForm() {
    this.clothesAddForm = this.formBuilder.group({
      clothesName: ['', Validators.required],
      categoryId: ['', Validators.required],
      colorId: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      unitPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
       this.categories=response.data;
    })
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
       this.colors=response.data;
    })
  }

  add(){
    if (this.clothesAddForm.valid) {
      let clothesModel = Object.assign({},this.clothesAddForm.value);
      this.clothesService.add(clothesModel).subscribe((response=>{



        this.toastrService.success(response.message,"Başarılı");
      }),responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata");
          }
        }

      })
    }
    else{
      this.toastrService.error("Formunuz eksik", "Hata");
    }
  }
}
