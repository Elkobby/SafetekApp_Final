import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpagePage');
  }

  pushPage() {
    this.navCtrl.push(MeetpointsPage);
  }

}
