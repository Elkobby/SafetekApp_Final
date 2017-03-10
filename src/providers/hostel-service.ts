import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HostelService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HostelService {
  hostels: any;  

  constructor(public http: Http) {
    console.log('Hello HostelService Provider');
 
  }
  
 getHostels(){
   if(this.hostels){
     return Promise.resolve(this.hostels); 
   } 

   return new Promise(resolve =>{
    this.http.get('http://localhost/api/index.php/hostels').map(res => res.json()).subscribe(data => {
    this.hostels = data.hostels;
    resolve(this.hostels); 
  })
   })
  
 };

//   searchHostels(hostelName){
//  var url = 'http://localhost/api/index.php/hostels'; 
//         var response = this.http.get(url).map(res => res.json());
//         return response;
//  };

}
