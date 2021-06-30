
import { HttpClient } from '@angular/common/http';
import { GetUser, SetSelectedUser } from './../actions/users.actions';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { User } from "src/app/model/users.model";
import { ApiserviceService } from 'src/app/apiservice.service';

export class UserStateModel {
    users: User[] = [];
    usersloaded: boolean = false
    SelectedUser: User = {};
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        usersloaded: false,
        SelectedUser: {}
    }
})

@Injectable()
export class UserState {
    constructor(private http: HttpClient, private _apiservice: ApiserviceService) { }
    @Selector()
    static getUserList(state: UserStateModel) {
        return state.users
    }

    // get loaded user info
    @Selector()
    static usersloaded(state: UserStateModel) {
        return state.usersloaded;
    }
    // get selecteduser 
    @Selector()
    static SelectedUser(state: UserStateModel) {
        return state.SelectedUser;
    }

    @Action(GetUser)
    getUsers({ getState, setState }: StateContext<UserStateModel>) {
        return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(tap(res => {
            const arrToObjRes = Object.assign(res)
            const state = getState();
            setState({
                ...state,
                users: arrToObjRes,
                usersloaded: true
            })
        }))
    }

    @Action(SetSelectedUser)
    setSelectedUser({ getState, setState }: StateContext<UserStateModel>, { id}: SetSelectedUser) {
        const state = getState();
        const userlist = state.users
        let uid = id

        // console.log(userlist);
        if (userlist.length > 0) {
            const index = userlist.findIndex(user => user.id == uid);
            const data = Object.assign(userlist[index]);
           return setState({
                ...state,
                SelectedUser: data
            })
        } else {
        //   return  this._apiservice.getsingledata(uid).subscribe(
        //         res=>{
        //             // console.log(res);
        //             const state = getState();
        //                 const userlist = [res]
        //                 setState({
        //                     ...state,
        //                     SelectedUser: userlist[0],
        //                     // users: userlist
        //                 })
        //         }
        //     )
            return this.http.get('https://jsonplaceholder.typicode.com/posts/' + uid).pipe(tap((res: any) => {
                // console.log(res);
                // const data = Object.assign([res]);
                // console.log(data);

                const state = getState();
                const userlist = [res]
                setState({
                    ...state,
                    SelectedUser: userlist[0],
                    // users: userlist
                })
            }));
        }


    }




}