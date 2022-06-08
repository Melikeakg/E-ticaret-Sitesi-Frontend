import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  /**
   *
   */
  constructor(private tokenService:TokenService,
    private authService:AuthService,
    private router : Router,
    private toastrService:ToastrService) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.authService.isAuthenticated()) {
        for (let i = 0; i < this.tokenService.getUserRolesWithJWT().length; i++) {
          const role = this.tokenService.getUserRolesWithJWT()[i];
          if (role == 'admin') {
            return true;
          }
        }
      }

    this.router.navigate(["/"]);
    this.toastrService.error("Yetkiniz yok!","Hata");
    return false;
  }
}
