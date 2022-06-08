import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User
  userId: number;
  currentUser:LoginModel

  constructor(private localStorageService:LocalStorageService,
    private userService:UserService,
    private tokenService:TokenService
    ) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(){

    // let userId = this.localStorageService.getUserId();
    // if (!userId) {
    //   return ;
    // }
    // this.userService.getById(userId).subscribe(response=>{
    //   this.user = response.data;
    //   console.log(response.data);
    // })

    if (this.localStorageService.contain("token")) {
      this.userService.getById(this.tokenService.getUserWithJWT().userId).subscribe(response=>{
        this.user = response.data;
        console.log(response);

      },errorResponse=>{
        console.log(errorResponse);
      })

    }else{
      this.user=null
    }
  }




}
