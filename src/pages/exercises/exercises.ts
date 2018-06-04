import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iexercise, WgerProvider, IExerciseImage } from '../../providers/wger/wger';
import { ExerciseDetailsPage } from '../exercise-details/exercise-details';

@IonicPage()
@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})
export class ExercisesPage implements OnInit {

  data: Iexercise
  dataImg: IExerciseImage

  id_category: number
  name_category: string
  languageId: number

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: WgerProvider) { }

  ngOnInit(): void {
    let hypermediaExercises: string
    let hypermediaExercisesImage: string


    this.id_category = this.navParams.get('id_category')
    this.name_category = this.navParams.get('name_category')
    this.languageId = this.navParams.get('languageId')
    console.log("language id: " + this.languageId)
    console.log(this.name_category)
    console.log(this.id_category)

    this.restProvider.getMainContent().subscribe(result => {
      //debugger
      hypermediaExercises = result.exercise
      hypermediaExercisesImage = result.exerciseimage

      this.restProvider.getExercises(hypermediaExercises + "?limit=1").subscribe(result => {

        this.restProvider.getExercises(hypermediaExercises + "?limit=" + result.count + "&category=" + this.id_category + "&language=" + this.languageId).subscribe(result => {
          this.data = result
        })
      })

    }, err => console.log(err))

  }

  getLanguage(link: string) {
    this.restProvider.getLanguage(link).subscribe(result => {
    })
  }

  itemSelected(name: any, id_ex: any) {
    this.navCtrl.push(ExerciseDetailsPage, {
      id_ex,
      name
    })
  }
}
