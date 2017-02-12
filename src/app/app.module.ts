import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {UserpagePage} from '../pages/userpage/userpage';
import {MeetpointsPage} from '../pages/meetpoints/meetpoints'; 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,  
    SignupPage, 
    UserpagePage, 
    MeetpointsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoginPage,
    SignupPage, 
    UserpagePage, 
    MeetpointsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
