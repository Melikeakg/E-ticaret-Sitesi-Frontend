import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  categories:Category[]=[];
  categoryUpdateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCategoryUpdateForm();
    this.getAllCategories();
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm=this.formBuilder.group({
      categoryId:["",Validators.required],
      categoryName:["",Validators.required]
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories=response.data;
    })
  }

  update(){
    if (this.categoryUpdateForm.valid) {
      let categoryModel=Object.assign({},this.categoryUpdateForm.value);
      this.categoryService.update(categoryModel).subscribe((response=>{
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

  delete(){
    if (this.categoryUpdateForm.value.categoryId!="") {
      let categoryModel = Object.assign({},this.categoryUpdateForm.value);
      this.categoryService.delete(categoryModel).subscribe((response=>{
        this.toastrService.success(response.message, "Başarılı");
      }),responseError=>{
        this.toastrService.error(responseError.message,"Hata");
      })
    }else{
      this.toastrService.error("Formunuz eksik!","Hata");
    }
  }

}
