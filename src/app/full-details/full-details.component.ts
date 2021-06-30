import { SetSelectedUser } from './../store/actions/users.actions';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../model/users.model';
import { UserState } from '../store/state/users.state';

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.css']
})
export class FullDetailsComponent implements OnInit, OnDestroy {
  userdata: any;
  loding: boolean = false

  constructor(private store: Store, private route: ActivatedRoute, private http: HttpClient) { }

  @Select(UserState.SelectedUser) selectedUser$: Observable<User> | any
  private singleusersub: Subscription | undefined;
  ngOnInit(): void {
    this.singleuser();
  }

  singleuser() {
    const urlid = this.route.snapshot.params['id'];
    // console.log(urlid);
    this.store.dispatch(new SetSelectedUser(urlid));
   this.singleusersub = this.selectedUser$.subscribe(
      (res: any) => {
        this.userdata = res
        this.loding = true
      }
    )
  }

  ngOnDestroy(){
    if(this.singleusersub){
      this.singleusersub.unsubscribe();
    }
  }

}
