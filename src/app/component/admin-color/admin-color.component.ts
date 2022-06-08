import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-color',
  templateUrl: './admin-color.component.html',
  styleUrls: ['./admin-color.component.css']
})
export class AdminColorComponent implements OnInit {

  color : Color;
  colorAddForm:FormGroup;
  colors : Color[]=[];
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllColors();
    this.createColorAddForm();
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getByColorId(colorId:number){
    this.colorService.getByColorId(colorId).subscribe(response=>{
      this.color=response.data;
    })
  }

  delete(color:Color){
    this.colorService.delete(color).subscribe((response)=>{
      this.colors=response.data;
      this.toastrService.success(color.colorName + "  " +"renk bilgisi silindi."  );
      this.getAllColors();
    },responseError=>{
      this.toastrService.error("Renk bilgisi silinemedi",)
    })
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
       colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success("Renk bilgileri eklendi", "Başarılı");
        this.getAllColors();
      },responseError=>{
        console.log(responseError);
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata");
          }
        }
      })
    }
    else if (this.colorAddForm.value.colorName == "") {
      this.toastrService.error("Formunuz eksik","Hata");
    }
  }
}
