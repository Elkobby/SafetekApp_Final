import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {UserpagePage} from '../pages/userpage/userpage';
import {MeetpointsPage} from '../pages/meetpoints/meetpoints';
import {HostelActivePage} from '../pages/hostel-active/hostel-active';  
import { HostelInactivePage} from '../pages/hostel-inactive/hostel-inactive'; 
import {ModalPage} from '../pages/modal/modal'; 
import {UserActionPage} from '../pages/user-action/user-action'; 
import {MembersPage} from '../pages/members/members'; 
import {ChatPage} from '../pages/chat/chat'; 
import {HostelService} from '../providers/hostel-service'; 
import {HostelSearch} from '../providers/hostel-search'; 



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,  
    SignupPage, 
    UserpagePage, 
    MeetpointsPage, 
    HostelActivePage,
    HostelInactivePage, 
    ModalPage, 
    UserActionPage, 
    MembersPage, 
    ChatPage, 
    
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    HttpModule, 
    JsonpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoginPage,
    SignupPage, 
    UserpagePage, 
    MeetpointsPage, 
    HostelActivePage,
    HostelInactivePage, 
    ModalPage, 
    UserActionPage, 
    MembersPage,
    ChatPage, 
   
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, HostelSearch]
})
export class AppModule {}
