import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { CartService } from 'src/app/services/cart.service';
import { ClothesImageService } from 'src/app/services/clothes-image.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart-summary-detail',
  templateUrl: './cart-summary-detail.component.html',
  styleUrls: ['./cart-summary-detail.component.css'],
})
export class CartSummaryDetailComponent implements OnInit {
  clothesDetails: ClothesDetail[] = [];
  cartItems: CartItem[];

  imageUrl : string ="https://localhost:44347/";

  customerAddForm: FormGroup;

  constructor(
    private cartService: CartService,
    private clothesImageService: ClothesImageService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.createCustomerAddForm();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  getImageSource(clothesDetail: ClothesDetail): string {
    let url: string = 'https://localhost:44347/' + clothesDetail.imagePath;
    return url;
  }

  getImagePath(imagePath: string) {
    return this.clothesImageService.getImagePath(imagePath);
  }

  removeFromCart(clothesDetail: ClothesDetail) {
    this.cartService.removeFromCart(clothesDetail);
    this.toastrService.info('Ürün sepetten silindi', 'Bilgi');
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  beginShopping() {
    this.router.navigate(['clothes']);
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  add() {
    if (this.customerAddForm.valid) {
      let customerModel = Object.assign({}, this.customerAddForm.value);
      this.customerService.add(customerModel).subscribe(
        (response) => {
          this.toastrService.success(
            'Müşteri bilgileri kaydedildi.',
            'Başarılı'
          );
          //this.router.navigate(['payment']);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
      //this.router.navigate(['cart-summary-detail']);
    }
          this.router.navigate(['payment']);

  }
}
