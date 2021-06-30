import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private http:HttpClient) { }

  getsingledata(uid:any){
   return this.http.get('https://jsonplaceholder.typicode.com/posts/' + uid)
  }
}
