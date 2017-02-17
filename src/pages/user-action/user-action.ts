import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MembersPage} from '../members/members'; 

/*
  Generated class for the UserAction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-action',
  templateUrl: 'user-action.html'
})
export class UserActionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserActionPage');
  }

pushPage() {
  this.navCtrl.push(MembersPage); 
}
}
