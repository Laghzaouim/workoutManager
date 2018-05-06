import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WgerProvider, Iexercise } from '../../providers/wger/wger';

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

  id_exercises
  name_exercises

  description: string
  creationDate: string

  data:Iexercise

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: WgerProvider) {}
  
  ngOnInit(): void {
    let hypermediaExercises: string

    this.id_exercises = this.navParams.get('id_ex')
    this.name_exercises = this.navParams.get('name')

    console.log(this.id_exercises)
    console.log(this.name_exercises)

    this.restProvider.getMainContent().subscribe(result =>{
      hypermediaExercises = result.exercise
      this.getExercise(hypermediaExercises);
     })
  }

  private getExercise(link:string){

    for (var i = 1; i < 27; i++){

      this.restProvider.getExercises(link+"/?page=" + i).subscribe(result => {

        for (let i in result.results) {
          if (result.results[i].id == this.id_exercises) {
            //debugger
            this.description = result.results[i].description;
            this.creationDate = result.results[i].creation_date;

            console.log(this.description);
            console.log(this.creationDate)
          }
        }
      });
    }
  }
}
