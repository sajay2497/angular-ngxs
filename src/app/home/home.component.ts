import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../model/users.model';
import { GetUser } from '../store/actions/users.actions';
import { UserState } from '../store/state/users.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // alluser: any;
  @Select(UserState.getUserList) allusers$: Observable<User[]> | any
  @Select(UserState.usersloaded) usersloaded$: Observable<boolean> | any

  private userloadedSub: Subscription | undefined;
  // private userloadedSub = new Subject();
  constructor(private http: HttpClient, private store: Store) { }

  ngOnInit(): void {
    this.getdata();
    // this.allusers$.subscribe(
    //   (res: any) => {
    //     console.log('ajay', res);
    //     this.alluser = res
    //   }
    // )
  }

  getdata() {
    this.userloadedSub = this.usersloaded$.subscribe((usersloaded: any) => {
      if (!usersloaded) {
        this.store.dispatch(new GetUser());
      }
    })
  }

  datarefresh() {
    this.store.dispatch(new GetUser());
  }

  ngOnDestroy() {
    if (this.userloadedSub) {
      this.userloadedSub.unsubscribe();
    }
  }

}


