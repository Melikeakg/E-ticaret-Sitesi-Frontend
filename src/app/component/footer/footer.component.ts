import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private authService:AuthService,
    private tokenService:TokenService) { }

  ngOnInit(): void {
  }

  isAdmin(){
    if (this.authService.isAuthenticated()) {
      for (let i = 0; i < this.tokenService.getUserRolesWithJWT().length; i++) {
        const role = this.tokenService.getUserRolesWithJWT()[i];
        if (role == 'admin') {
          return true;
        }
      }
    }
    return false;
  }



}
