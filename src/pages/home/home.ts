import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IexerciseCategory, WgerProvider} from '../../providers/wger/wger'
import { ExercisesPage } from '../exercises/exercises';


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

   itemSelected(id_category:number){
      this.navCtrl.push(ExercisesPage,{
        id_category
    })
    
   }
  

}
