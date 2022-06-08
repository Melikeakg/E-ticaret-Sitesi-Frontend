import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

//FormBuilder bir injectable'dır.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //html kısmındaki formumuzla kodsal olarak birleştiriyoruz.
  //loginForm bir FormGroup'tur.
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message, 'Bilgi');
          localStorage.setItem('token', response.data.token);
          if (this.isAdmin()) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['']);
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }

  isAdmin() {
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

  register() {
    this.router.navigate(['register']);
  }
}
