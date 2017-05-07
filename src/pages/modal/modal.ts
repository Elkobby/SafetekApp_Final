import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserActionPage} from '../user-action/user-action'; 

/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  public data: any;
  public items: any = [];
  public post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http) {
    this.data = {};
    this.data.gname = "";
    this.data.mid = this.navParams.get("mId");
    this.data.sid = this.navParams.get("sId");
    this.data.hid = this.navParams.get("hId");
    this.data.gid = this.navParams.get("gId");
    //console.log('sId: '+ this.data.sid);
    //console.log('hId: '+ this.data.hid);
    //console.log('gId: '+ this.data.gid);
    //console.log('mId: '+ this.data.mid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
   dismiss() {
    this.viewCtrl.dismiss()}


  createGroup(){
    let gname = this.data.gname;

    let body     : string = "key=create&gname=" + gname +"&sId="+ this.data.sid + "&mId="+ this.data.mid,
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
          this.data.gid = this.items.replace(/\"/g, "");
          console.log('gId: '+this.items)
          this.navCtrl.push(UserActionPage, {sId: this.data.sid, hId: this.data.hid, gId: this.data.gid, mId: this.data.mid });
        });
    
  }

  initializeItems() {
    this.items = this.post;
  }

}
