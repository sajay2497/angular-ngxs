import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http: HttpClient) { }

  private checkobservable = new Subject<any>();
  private cartItem = new Subject<any>();

  showproduct() {
    return this.http.get('https://fakestoreapi.com/products');
  }
  setcartItem() {
    let local = localStorage.getItem('cart');
    if (local) {
      this.cartItem.next(JSON.parse(local));
    }

  }
  getcartItem(): Observable<any> {
    return this.cartItem.asObservable();
  }
  // check 

  addtocart(item: any) {
    let local_storage;

    let items = {
      product: item,
      quantity: 1,
    }
    let itemsInCart: { product: any; quantity: number; }[] = [];
    if (localStorage.getItem('cart') == null) {
      local_storage = [];
      itemsInCart.push(items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      // console.log('Pushed first Item: ', itemsInCart);
      this.setcartItem();
    }
    else {
      let local = localStorage.getItem('cart');
      if (local) {
        local_storage = JSON.parse(local)
      } else {
        local_storage = []
      }
      for (var i in local_storage) {
        if (items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          items = null as any;
          break;
        }
      }
      // return
      if (items) {
        itemsInCart.push(items);
      }
      local_storage.forEach(function (item: { product: any; quantity: number; }) {
        itemsInCart.push(item);
      })
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      this.setcartItem();
    }
  }


}
