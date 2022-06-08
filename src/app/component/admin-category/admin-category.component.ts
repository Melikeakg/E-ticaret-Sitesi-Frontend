import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categoryAddForm:FormGroup;
  category:Category;
  categories : Category[]=[];
  constructor(private categoryService:CategoryService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.createCategoryAddForm();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories=response.data;
    })
  }

  getByCategoryId(categoryId:number){
    this.categoryService.getByCategoryId(categoryId).subscribe(response=>{
      this.category=response.data;
    })
  }

  delete(category:Category){
    this.categoryService.delete(category).subscribe((response)=>{
      this.categories=response.data;
      this.toastrService.success(category.categoryName + "  " +"kategori bilgisi silindi."  );
      this.getAllCategories();
    },responseError=>{
      this.toastrService.error("Renk bilgisi silinemedi",)
    })
  }

  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:["",Validators.required]
    })
  }

  add(){
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({},this.categoryAddForm.value);
      this.categoryService.add(categoryModel).subscribe((response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.getAllCategories();
      }),responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata");
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Hata");
    }
  }
}
