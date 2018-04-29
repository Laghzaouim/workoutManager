import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExerciseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise-details',
  templateUrl: 'exercise-details.html',
})
export class ExerciseDetailsPage implements OnInit {

  id_exercises = null

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  
  ngOnInit(): void {
    this.id_exercises = this.navParams.get('id_ex')
    console.log(this.id_exercises)
  }


}
