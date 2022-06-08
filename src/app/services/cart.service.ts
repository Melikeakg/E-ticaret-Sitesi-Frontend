import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Clothes } from '../models/clothes';
import { ClothesDetail } from '../models/clothesDetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(clothesDetail:ClothesDetail){
    let item = CartItems.find((c)=>c.clothes.clothesId===clothesDetail.clothesId);
    if (item) {
      item.quantity += 1;
    }else{
      let cartItem = new CartItem();
      cartItem.clothes = clothesDetail;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(clothesDetail:ClothesDetail){
    let item = CartItems.find((c)=>c.clothes.clothesId===clothesDetail.clothesId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }

  calculateTotal():number{
    let total : number=0;
    CartItems.forEach(cartItem=>{
      let sum = cartItem.clothes.unitPrice * cartItem.quantity
      total += sum
    })
    return total;
  }

  calculateTotalWithCargo():number{
    let cargo = 10;
    let sum = this.calculateTotal()+ cargo;
    return sum;
  }


}
