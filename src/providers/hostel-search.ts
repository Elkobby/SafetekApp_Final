import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the HostelSearch provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HostelSearch {

  hostels: any; 

  constructor(public http: Http) {
    console.log('Hostel services loaded' );
    this.getHostels(); 

  }

 //Functions to load hostel data from Database
  getHostels() {
  if (this.hostels) {
    // already loaded data
    return Promise.resolve(this.hostels);
  }

  // don't have the data yet
  return new Promise(resolve => {
   
    this.http.get('http://localhost/api/index.php/hostels')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.hostels = data.hostels; 
        resolve(this.hostels);
      });
  });
}

//Search hostels Functions 

searchHostels(hostelName){
  return this.hostels.filter((hostel) => {
    return hostel.name.toLowerCase().indexOf(hostelName.toLowerCase()) > -1; 
  }) ; 
}

}

