import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './component/category/category.component';
import { ColorComponent } from './component/color/color.component';
import { ClothesComponent } from './component/clothes/clothes.component';
import { ClothesImageComponent } from './component/clothes-image/clothes-image.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';


import { ToastrModule } from 'ngx-toastr';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { CategoryUpdateComponent } from './component/category-update/category-update.component';
import { ClothesAddComponent } from './component/clothes-add/clothes-add.component';
import { ClothesUpdateComponent } from './component/clothes-update/clothes-update.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './component/login/login.component';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';
import { CartSummaryDetailComponent } from './component/cart-summary-detail/cart-summary-detail.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AdminComponent } from './component/admin/admin.component';
import { MainDashboardComponent } from './component/main-dashboard/main-dashboard.component';
import { AdminColorComponent } from './component/admin-color/admin-color.component';
import { AdminCategoryComponent } from './component/admin-category/admin-category.component';
import { AdminClothesImageComponent } from './component/admin-clothes-image/admin-clothes-image.component';
import { CustomerComponent } from './component/customer/customer.component';
import { ColorDeleteComponent } from './component/color-delete/color-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ColorComponent,
    ClothesComponent,
    ClothesImageComponent,
    NavbarComponent,
    FilterCategoryPipe,
    FilterColorPipe,
    ColorUpdateComponent,
    CategoryUpdateComponent,
    ClothesAddComponent,
    ClothesUpdateComponent,
    RegisterComponent,
    LoginComponent,
    CartSummaryComponent,
    CartSummaryDetailComponent,
    FooterComponent,
    OrderComponent,
    ProfileComponent,
    PaymentComponent,
    AdminComponent,
    MainDashboardComponent,
    AdminColorComponent,
    AdminCategoryComponent,
    AdminClothesImageComponent,
    CustomerComponent,
    ColorDeleteComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],

})
export class AppModule { }
