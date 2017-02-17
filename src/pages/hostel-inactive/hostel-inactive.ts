import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import {ModalPage} from '../modal/modal'; 

/*
  Generated class for the HostelInactive page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hostel-inactive',
  templateUrl: 'hostel-inactive.html'
})
export class HostelInactivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostelInactivePage');
  }
presentModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }
  
   dismiss() {
    this.viewCtrl.dismiss();}
}
