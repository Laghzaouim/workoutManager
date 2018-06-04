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

  id_exercise
  name_exercises

  description: string
  creationDate: string
  equipments: number[]
  equipmentName: string = ""
  muscles: number[]
  musclesName: string = ""
  imgURL: string

  data: Iexercise

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: WgerProvider) { }

  ngOnInit(): void {
    let hypermediaExercises: string
    let hypermediaEquipment: string
    let hypermediaMuscles: string
    let hypermediaImg: string

    this.id_exercise = this.navParams.get('id_ex')
    this.name_exercises = this.navParams.get('name')

    console.log(this.id_exercise)
    console.log(this.name_exercises)

    this.restProvider.getMainContent().subscribe(result => {
      hypermediaExercises = result.exercise
      hypermediaEquipment = result.equipment
      hypermediaMuscles = result.muscle
      hypermediaImg = result.exerciseimage



      this.restProvider.getExercisesDetails(hypermediaExercises + this.id_exercise).subscribe(async result => {
        this.description = await result.description
        this.equipments = await result.equipment
        this.muscles = await result.muscles

        console.log(result.description)

        this.getEqipment(hypermediaEquipment)
        this.getMuscles(hypermediaMuscles)
      })

      this.getImage(hypermediaImg)
    }, err => console.log(err))


  }

  private getEqipment(link: string) {

    this.restProvider.getEquipment(link).subscribe(result => {

      for (let i in result.results) {
        if (this.equipments.indexOf(result.results[i].id)) {
          console.log(result.results[i].name)

          this.equipmentName += result.results[i].name + " "
        }
      }

    })
  }

  private getMuscles(link: string) {
    this.restProvider.getMuscles(link).subscribe(result => {
      //debugger

      for (let i in result.results) {

        if (this.muscles.indexOf(result.results[i].id)) {
          this.musclesName += result.results[i].name + "\n"
          console.log(this.musclesName)
        }

      }
    })
  }

  private getImage(link: string) {
    this.restProvider.getExercisesImege(link).subscribe(result => {
      //debugger
      for (let i in result.results) {
        if (result.results[i].exercise == this.id_exercise) {
          this.imgURL = result.results[i].image
          console.log("image url: " + this.imgURL)
        }
      }

    })
  }

}
