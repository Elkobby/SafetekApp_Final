import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserpagePage} from '../userpage/userpage';
import {SignupPage} from "../signup/signup";
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
  public data : any;
  public post: any;
  public firstname: any;

  constructor(public navCtrl: NavController,private http : Http, private alert : AlertController,
              private loading : LoadingController) {
    this.data = {};
    this.data.reference = "";
    this.data.index = "";
    this.data.password = "";
  }

  login(){

    let     body     : string = "reference=" + this.data.reference +"&index="+ this.data.index +"&password="+ this.data.password,
            type     : string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers   : any    = new Headers({ 'Content-Type': type}),
            options   : any    = new RequestOptions({ headers: headers }),
            url     : any    = "http://nibbles/webfiles/safetekApp/signin.php";

        this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data=>{
              this.post = data;
              console.log("user: "+JSON.stringify(this.post));
              let firstname = JSON.stringify(this.post.firstname);
              let loader = this.loading.create({content: "Checking, Please wait...", duration: 500});
              loader.present();
              this.navCtrl.push(UserpagePage, { id: this.post.sId, name: firstname});
              },
              error=>{ let alert = this.alert.create({title: 'Warning', subTitle: 'Reference | Index | Password combination is Incorrect', buttons:["ok"]});
              alert.present();

        });
  }


  ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
  }
  pushPage() {
        this.navCtrl.push(SignupPage);
    }

}