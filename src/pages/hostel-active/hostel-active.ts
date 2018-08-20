import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {UserActionPage} from '../user-action/user-action';
import 'rxjs/add/operator/map';

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
  public data: any;
  public items: any = [];
  public post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.mid = "";
    this.data.sid = this.navParams.get("sId");
    this.data.hid = this.navParams.get("hId");
    this.data.gid = this.navParams.get("gId");
    //console.log('sId: '+ this.data.sid);
    //console.log('hId: '+ this.data.hid);
    //console.log('gId: '+ this.data.gid);
  }

  ionViewDidLoad() {
    if(this.navParams.get("record")) {
      this.getID(this.navParams.get("record"));
      this.groupCount(this.data.gid);
      this.getHname(this.data.hid);
      //this.joinGroup(this.data.gid,this.data.sid)
    }
    console.log('ionViewDidLoad HostelActivePage');
  }

  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  getID(item){
    this.data.mid = item.mId;
    console.log('mId: '+ this.data.mid);
    //this.parameter1 = this.navParams.get('param1');
    //console.log('sId: '+ this.parameter1);
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

  groupCount(gId) {
    let body     : string = "key=tmembers&gId=" + gId,
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
          this.data.mcount = this.items.replace(/\"/g, "");
          //console.log('count: '+this.items)
          //console.log('count: '+this.items.replace(/\"/g, ""))
          //console.log("getGroup success");
        });

  }

  gUpdate(gId,sId){
    let body     : string = "key=update&gId=" + gId + "&sId=" + sId,
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
          //this.data.mcount = this.items.replace(/\"/g, "");
          //console.log('update: '+this.items)
          //console.log('count: '+this.items.replace(/\"/g, ""))
          //console.log("getGroup success");
        });
  }

  joinGroup(){
    this.gUpdate(this.data.gid,this.data.sid);
    this.navCtrl.push(UserActionPage,{sId: this.data.sid, hId: this.data.hid, gId: this.data.gid, mId: this.data.mid });
  }

  viewEntry(param) {
          this.navCtrl.push(param);
    }

  initializeItems() {
    this.items = this.post;
  }


}
