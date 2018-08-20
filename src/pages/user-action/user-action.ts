import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {MembersPage} from '../members/members'; 
import {ChatPage} from '../chat/chat'; 
import {UserpagePage} from '../userpage/userpage'; 
import {EmergencyPage} from '../emergency/emergency'; 

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
  public data: any;
  public items: any = [];
  public post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.mid = this.navParams.get("mId");
    this.data.sid = this.navParams.get("sId");
    this.data.hid = this.navParams.get("hId");
    this.data.gid = this.navParams.get("gId");
    //console.log('sId: '+ this.data.sid);
    //console.log('hId: '+ this.data.hid);
    //console.log('gId: '+ this.data.gid);
    //console.log('mId: '+ this.data.mid);
  }

   getGname(mId) {
    let body     : string = "key=gname&mId=" + mId,
        type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers   : any    = new Headers({ 'Content-Type': type}),
        options   : any    = new RequestOptions({ headers: headers }),
        url     : any    = "http://nibbles/webfiles/safetekApp/retreive-groups.php";

    this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data =>
        {
          this.post = JSON.stringify(data);
          this.data.gname = this.post.replace(/\"/g, "");
          //console.log('gname: '+this.post.replace(/\"/g, ""));
          //console.log('gname: '+this.post);
        });

  }

  exitGroup(){
    //**************Individual******************
    //delete all foriegn keys(student) on gId

    //**************SetOff**********************
    //delete all foriegn keys(meetpoint) on gId 

    //**************All members*****************
    //delete all foriegn keys(student, meetpoint) on gId 
    //delete group with key (gId) 
  }

  ionViewDidLoad() {
    this.getGname(this.data.mid);
    console.log('ionViewDidLoad UserActionPage');
  }

  pushPage() {
    this.navCtrl.push(MembersPage, {sId: this.data.sid, hId: this.data.hid, gId: this.data.gid, mId: this.data.mid }); 
  }

  pushPageChat(){
    this.navCtrl.push(ChatPage);
  }

  pushPageExit(){
    this.exitGroup();
    this.navCtrl.setRoot(UserpagePage);
  }

  pushPageE(){
    this.navCtrl.push(EmergencyPage);
  }

}
