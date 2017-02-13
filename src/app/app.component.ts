import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup'; 
import {UserpagePage} from '../pages/userpage/userpage';
import {MeetpointsPage} from '../pages/meetpoints/meetpoints'; 
import {HostelActivePage} from '../pages/hostel-active/hostel-active'; 
import { HostelInactivePage} from '../pages/hostel-inactive/hostel-inactive'; 

import * as firebase from 'firebase'; 


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav; 

  rootPage: any = HostelInactivePage;
  activePage : any; 

  pages: Array<{title: string, component:any}>

  constructor(public platform: Platform){
    this.initializeApp(); 

  this.pages = [
    {title: 'Home', component:UserpagePage},
     {title: 'login', component:LoginPage},
  ];

  this.activePage = this.pages[0]; 

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component); 
    this.activePage = page; 
  }

  checkActive(page){
    return page==this.activePage; 
  }

}
