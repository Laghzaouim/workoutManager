import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WgerProvider} from '../../providers/wger/wger'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  data: any;

  constructor(public navCtrl: NavController, public restProvider: WgerProvider) {
    //debugger;
    this.getData();
  }

  getData() {
    this.restProvider.getData()
    .then(data => {
      //debugger;
      this.data = data;
    });
  }
  

}
