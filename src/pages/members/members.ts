import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

 Person = [
      {name: 'Nana Kwame', 
      image: '../../assets/img/square.jpg'
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
    ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  }

}
