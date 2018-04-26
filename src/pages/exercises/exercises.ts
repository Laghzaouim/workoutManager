import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iexercise, WgerProvider } from '../../providers/wger/wger';


/**
 * Generated class for the ExercisesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})
export class ExercisesPage {

  id_category: number
  data:Iexercise

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: WgerProvider) {
    this.id_category = navParams.get('id')
    console.log(this.id_category)
    this.getData()
  }

  getData() {
    this.restProvider.getExercises().subscribe(result =>{
      //debugger
      this.data = result})
      
  }

 
}
