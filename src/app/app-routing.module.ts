import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './component/admin-category/admin-category.component';
import { AdminClothesImageComponent } from './component/admin-clothes-image/admin-clothes-image.component';
import { AdminColorComponent } from './component/admin-color/admin-color.component';
import { AdminComponent } from './component/admin/admin.component';
import { CartSummaryDetailComponent } from './component/cart-summary-detail/cart-summary-detail.component';
import { CategoryUpdateComponent } from './component/category-update/category-update.component';
import { CategoryComponent } from './component/category/category.component';
import { ClothesAddComponent } from './component/clothes-add/clothes-add.component';
import { ClothesImageComponent } from './component/clothes-image/clothes-image.component';
import { ClothesUpdateComponent } from './component/clothes-update/clothes-update.component';
import { ClothesComponent } from './component/clothes/clothes.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { CustomerComponent } from './component/customer/customer.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', component:ClothesComponent},
  { path: "clothes",  component: ClothesComponent },
  { path: "categories",  component: CategoryComponent },
  { path: "clothes/category/:categoryId",  component: ClothesComponent },
  { path: "clothes/color/:colorId",  component: ClothesComponent },
  { path: "clothesImages/clothes/:clothesId",  component: ClothesImageComponent },
  { path: "register",  component: RegisterComponent },
  { path: "login",  component: LoginComponent  },
  { path: "cart-summary-detail",  component: CartSummaryDetailComponent },
  { path: "profile",  component: ProfileComponent },
  { path: "payment",  component: PaymentComponent },

  { path: "colors/update",  component: ColorUpdateComponent, canActivate:[LoginGuard,AdminGuard] },
  { path: "categories/update",  component: CategoryUpdateComponent , canActivate:[LoginGuard,AdminGuard]},
  { path: "clothes/add",  component: ClothesAddComponent , canActivate:[LoginGuard,AdminGuard]},

  { path: "admin",  component: AdminComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: "admin-color",  component: AdminColorComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: "color/update/:colorId",  component: ColorUpdateComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: "admin-category",  component: AdminCategoryComponent, canActivate:[LoginGuard,AdminGuard]},
  { path: "admin-clothesImages/clothes/:clothesId",  component: AdminClothesImageComponent },
  { path: "customer",  component: CustomerComponent ,canActivate:[LoginGuard,AdminGuard]},
  { path: "clothes-add",  component: ClothesAddComponent, canActivate:[LoginGuard,AdminGuard] },
  { path: "admin/clothes/update/:clothesId",  component: ClothesUpdateComponent , canActivate:[LoginGuard,AdminGuard]},















];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
