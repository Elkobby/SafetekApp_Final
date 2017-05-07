import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
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
  public data: any;
  public items: any = [];
  public post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
    public viewCtrl: ViewController, public http: Http) {
    this.data = {};
    this.data.sid = this.navParams.get("sId");
    this.data.hid = this.navParams.get("hId");
    this.data.gid = this.navParams.get("gId");
    console.log('sId: '+ this.data.sid);
    console.log('hId: '+ this.data.hid);
    console.log('gId: '+ this.data.gid);
  }

  getHname(hId) {
    let body     : string = "key=hname&hId=" + hId,
        type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers   : any    = new Headers({ 'Content-Type': type}),
        options   : any    = new RequestOptions({ headers: headers }),
        url     : any    = "http://nibbles/webfiles/safetekApp/retreive-groups.php";

    this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data =>
        {
          this.post = JSON.stringify(data);
          this.initializeItems();
          this.data.hname = this.items.replace(/\"/g, "");
          //console.log('hname: '+this.post.name)
          //console.log('hname: '+this.items.replace(/\"/g, ""))
          //console.log("getGroup success");
        });

  }

  initializeItems() {
    this.items = this.post;
  }


  ionViewDidLoad() {
    if(this.navParams.get("record")) {
      this.getID(this.navParams.get("record"));
      this.getHname(this.data.hid);
    }
    console.log('ionViewDidLoad HostelInactivePage');
  }

  getID(item){
    this.data.mid = item.mId;
    //console.log('mId: '+ this.data.mid);
  }

presentModal() {
    let modal = this.modalCtrl.create(ModalPage, {sId: this.data.sid, hId: this.data.hid, gId: this.data.gid, mId: this.data.mid });
    modal.present();
  }
  
   dismiss() {
    this.viewCtrl.dismiss();}
}
