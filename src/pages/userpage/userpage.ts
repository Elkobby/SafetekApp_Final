import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {MeetpointsPage} from '../../pages/meetpoints/meetpoints'; 

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

  private posts: any; 
  private items: any;
  public firstname: any;
  public sId: any;

  constructor(private http: Http, private loadingCtrl: LoadingController, public navCtrl: NavController, private navParams: NavParams) {

   if(this.navParams.get("name")){
     this.firstname = this.navParams.get('name').replace(/\"/g, "");
     this.sId = this.navParams.get('id');
     console.log(this.firstname);
     console.log(this.sId);
    }

    // Show the loading message
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });

    this.http.get('http://nibbles/webfiles/safetekApp/retreive-hostels.php')
        .map(res => res.json())
        .subscribe(data => {
      this.posts = data;
      this.initializeItems();

      // Hide the loading message
      loadingPopup.dismiss();
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpagePage');
   }

  viewEntry({record: item})
  {
    this.navCtrl.push(MeetpointsPage, {record: item, sId: this.sId});
  }


  initializeItems() {
    this.items = this.posts;
    //console.log(this.items);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}




