import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WgerProvider, Iexercise, Iwger} from '../../providers/wger/wger'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  data: Iexercise;

  constructor(public navCtrl: NavController, public restProvider: WgerProvider) {
    //debugger;
    this.getData();
  }

  getData() {
    this.restProvider.getData().subscribe(result =>{
      //debugger
      this.data = result})
  }
  

}
