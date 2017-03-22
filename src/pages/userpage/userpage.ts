import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MeetpointsPage} from '../../pages/meetpoints/meetpoints'; 
// import {HostelService} from '../../providers/hostel-service';
import {HostelSearch} from '../../providers/hostel-search';

import 'rxjs/add/operator/map'; 


/*
  Generated class for the Userpage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html'
})
export class UserpagePage {
  
  hostelName: string = '';
  hostels: any; 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public hostelSearch: HostelSearch)  {
  this.loadHostels();
  
  }

  ionViewDidLoad() {
    
    // console.log('ionViewDidLoad UserpagePage');
   this.hostelSearch.getHostels();
  //  this.setSearchedHostels(); 
 
}
  // Function for displaying hostels
  loadHostels(){
    this.hostelSearch.getHostels()
    .then(data =>{
      this.hostels = data; 
    }); 
  }

  //Functions for naviagting between pages
  pushPage() {
    this.navCtrl.push(MeetpointsPage);
  }

  //Implement search hostels
  // setSearchedHostels(){
  //   this.hostels = this.hostelSearch.searchHostels(this.hostelName); 
  // }

 

}