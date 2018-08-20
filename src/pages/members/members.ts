import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Members page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
  public data: any;
  public items: any = [];
  public post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.mid = this.navParams.get("mId");
    this.data.sid = this.navParams.get("sId");
    this.data.hid = this.navParams.get("hId");
    this.data.gid = this.navParams.get("gId");
    //this.data.image = '../../assets/img/square.jpg'
    console.log('sId: '+ this.data.sid);
    console.log('hId: '+ this.data.hid);
    console.log('gId: '+ this.data.gid);
    console.log('mId: '+ this.data.mid);
  }

  getMembers(gId){
    let body     : string = "key=gmembers&gId=" + gId,
        type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers   : any    = new Headers({ 'Content-Type': type}),
        options   : any    = new RequestOptions({ headers: headers }),
        url     : any    = "http://nibbles/webfiles/safetekApp/retreive-groups.php";

    this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data =>
        {
          this.post = data;
          this.initializeItems();
          //this.data.fullnames = this.post.replace(/\"/g, "");
          //console.log('gname: '+this.items);
          //console.log('gname: '+this.items.fullname);
        });
  }

 /* Person = [
      {name: 'Nana Kwame', 
      
    },
       {name: 'Addae Mensah', 
      image: '../../assets/img/square.jpg'
    }, 
     {name: 'Tolu Tayo', 
      image: '../../assets/img/square.jpg'
    },
     {name: 'Teniola Tayo', 
      image: '../../assets/img/square.jpg'
    }
    ];*/

  initializeItems() {
    this.items = this.post;
  }

  ionViewDidLoad() {
    this.getMembers(this.data.gid);
    console.log('ionViewDidLoad MembersPage');
  }

}
