import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }

  goToCart() {
    this.router.navigate(['cart-summary-detail']);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.toastrService.info('Hesabınızdan çıkış yapıldı.', 'Bilgi');
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
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
