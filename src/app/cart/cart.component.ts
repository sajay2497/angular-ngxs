import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productlist: any;
  cartitem: any;

  constructor(private cartservice: CartserviceService) { }

  ngOnInit(): void {
    this.fetchproduct();
    // this.cartservice.setcartItem();
    // this.cartservice.setcartItem();
    // this.cartservice.getcartItem()
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       // this.cartitem = res
    //     }
    //   );
  }

  fetchproduct() {
    this.cartservice.showproduct().subscribe(
      (res: any) => {
        // console.log(res);
        this.productlist = res
      }
    )
  }

  addtocart(data: any) {
    this.cartservice.addtocart(data);
  }

}
