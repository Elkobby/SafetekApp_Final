import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HostelInactivePage} from '../hostel-inactive/hostel-inactive';
import {HostelActivePage} from '../hostel-active/hostel-active';

/*
  Generated class for the Meetpoints page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meetpoints',
  templateUrl: 'meetpoints.html'
})
export class MeetpointsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetpointsPage');
  }
 pushPage() {
    this.navCtrl.push(HostelInactivePage);
  }

   pushPage2() {
    this.navCtrl.push(HostelActivePage);
  }

}
