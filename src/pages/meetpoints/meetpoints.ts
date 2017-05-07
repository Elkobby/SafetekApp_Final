import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {HostelActivePage} from '../hostel-active/hostel-active';
import {HostelInactivePage} from "../hostel-inactive/hostel-inactive";
import {MyApp} from "../../app/app.component";

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
    public data: any;
    public items: any = [];
    public get: any = [];
    public post: any;
    public postId: any = [];
    public getId: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      this.data = {};
      this.data.hid = "";
      this.data.mid = "";
      this.data.sid = this.navParams.get("sId");
      //console.log(this.data.sid);
  }

  ionViewDidLoad() {
      if(this.navParams.get("record")) {
          this.getID(this.navParams.get("record"));
          this.getMeetpoint();
          //this.payment();
      }
      console.log('ionViewDidLoad MeetpointsPage');
  }

    // Assign the navigation retrieved data to properties
    // used as models on the page's HTML form
    getID(item){
        this.data.hid = item.hId;
        //this.data.mid = item.mId;
        console.log('hId: '+ this.data.hid);
    }

    // Retrieve the JSON encoded data from the remote server
    // Using Angular 2's Http class and an Observable - then
    // assign this to the items array for rendering to the HTML template
    getMeetpoint() {
        let body     : string = "recordID=" + this.data.hid,
            type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers   : any    = new Headers({ 'Content-Type': type}),
            options   : any    = new RequestOptions({ headers: headers }),
            url     : any    = "http://nibbles/webfiles/safetekApp/retreive-meetpoint.php";

        this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe(data =>
            {
                this.post = data;
                this.get = JSON.stringify(this.post)
                //console.log('mId: '+ this.get);
                this.initializeItems();
                //console.log("getMeetppoint success");
                //console.log('mId: '+ this.get.mId);
            });
    }

    //Check for any group available at that meetpoint
    isGroup({ record: item }){
        let body     : string = "key=isgroup&mId=" + item.mId,
            type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers   : any    = new Headers({ 'Content-Type': type}),
            options   : any    = new RequestOptions({ headers: headers }),
            url     : any    = "http://nibbles/webfiles/safetekApp/retreive-groups.php";

        this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe(data =>
            {
                this.postId = data;
                this.getId =this.postId;
                //console.log("gId "+this.getId.gId);
                //console.log("gId: "+JSON.stringify(this.getId));
                if( this.getId == 0){
                    this.navCtrl.push(HostelInactivePage, { record: item, sId: this.data.sid, hId: this.data.hid, gId: this.getId });
                }
                else
                    this.navCtrl.push(HostelActivePage,{ record: item, sId: this.data.sid, hId: this.data.hid, gId: this.getId });
                //console.log(JSON.stringify(param.record.mId));

            });
    }

    initializeItems() {
        this.items = this.post;
        //console.log('mId: '+ this.post);
    }

}
