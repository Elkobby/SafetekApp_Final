import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserActionPage} from '../user-action/user-action'; 

/*
  Generated class for the HostelActive page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hostel-active',
  templateUrl: 'hostel-active.html'
})
export class HostelActivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostelActivePage');
  }
  pushPage(){
    this.navCtrl.setRoot(UserActionPage);
  }
}
