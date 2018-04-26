import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WgerProvider, IexerciseCategory} from '../../providers/wger/wger'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  data: IexerciseCategory;

  constructor(public navCtrl: NavController, public restProvider: WgerProvider) {
    //debugger;
    this.getData();
  }

  getData() {
    this.restProvider.getexerciseCategory().subscribe(result =>{
      //debugger
      this.data = result})
  }

   itemSelected(item){
     console.log(item);
    
   }
  

}
