import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserpagePage} from '../userpage/userpage';
import {SignupPage} from '../signup/signup'; 

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushPage(){
    this.navCtrl.setRoot(UserpagePage);
  }

   pushPageSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }

}
