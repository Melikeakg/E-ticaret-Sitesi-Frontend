import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  currentColor : Color
  colors : Color[];
  colorUpdateForm:FormGroup;
  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params=>{
      if (params["colorId"]) {
        // this.getByColorId(params["colorId"]);
      }
    }))
    this.createUpdateColorForm();
    this.getAllColors();
  }

  createUpdateColorForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  // getByColorId(colorId:number) {
  //   this.colorService.getByColorId(colorId).subscribe(response => {
  //     console.log(response)
  //     if(response.success && response.data) {
  //       this.currentColor = response.data
  //       //this.update()
  //     } else {
  //       this.toastrService.error("Renk bilgisi bulunamadı.","Hata");
  //     }
  //   })
  // }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response=>{
        this.toastrService.success(response.message,"Başarılı");

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
