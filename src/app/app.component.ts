import { Component, OnInit } from '@angular/core';
import { CartserviceService } from './cartservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-ngrx';
  cartitem: any;

  constructor(private cartservice: CartserviceService) { }

  ngOnInit(): void {
    this.cartservice.setcartItem();
    this.cartservice.getcartItem().subscribe(
        (res: any) => {
          // console.log(res);
          this.cartitem = res
        }
      );
  }
}
