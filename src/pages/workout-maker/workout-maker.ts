import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WgerProvider, IexerciseCategory } from '../../providers/wger/wger';
import { ExerciseDetailsPage } from '../exercise-details/exercise-details';


/**
 * Generated class for the WorkoutMakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout-maker',
  templateUrl: 'workout-maker.html',
})
export class WorkoutMakerPage {

  loading: any;
  categorys: IexerciseCategory;
  categoryCheckboxResult: any[];
  categoryCheckboxOpen: boolean;
  hypermediaExercises: string
  fullWorkoutExercises: any[]
  workoutMaked: string[]
  workoutLength: number
  id_exercises: number[]
  nameExercises: string[]

  constructor(
    public navCtrl: NavController, 
    public restProvider: WgerProvider, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

    let hypermediaCategorys: string;


    this.restProvider.getMainContent().subscribe(result => {
      hypermediaCategorys = result.exercisecategory
      this.hypermediaExercises = result.exercise

      this.getCategorys(hypermediaCategorys);

    })
  }

  getExercises(link: string) {
    let workout = new Array()
    let id = new Array()
    let name = new Array()
    for (var i = 1; i < 27; i++) {
      this.restProvider.getExercises(link + "/?page=" + i).subscribe(result => {
        //debugger
        for (let j in result.results) {

          if (this.categoryCheckboxResult.find(x => x == result.results[j].category
            && result.results[j].language == 2
            && result.results[j].name != '')
            && result.results[j].name != 'Test') {

            workout.push(result.results[j].name)
            id.push(result.results[j].id)
            name.push(result.results[j].name)

            this.fullWorkoutExercises = workout
            this.id_exercises = id
            this.nameExercises = name

          }
        }
      })
    }
  }

  makeWorkout() {
    let workout = new Array()
    let num
    let length = this.fullWorkoutExercises.length

    for (var i = 0; i < 10; i++) {

      num = this.getRandomInt(length)

      workout.push(this.fullWorkoutExercises[num])

      this.workoutMaked = workout
      console.log(length)

    }
  }

  

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getCategorys(link: string) {
    this.restProvider.getexerciseCategory(link).subscribe(result => {
      this.categorys = result
    })
  }

  getWorkout() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    
    setTimeout( () => { 
      this.makeWorkout()
      this.loading.dismiss() 
    }, 2000 );
    
  }

  
  showCategory() {
    let alert = this.alertCtrl.create();
    alert.setTitle('What do you want to train today?');

    for (let i in this.categorys.results) {
      let categoryName = this.categorys.results[i].name
      let id = this.categorys.results[i].id
      alert.addInput({
        type: 'checkbox',
        label: categoryName,
        value: String(id),
      });
    }
  
    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Make',
      handler: data => {
        console.log('Checkbox data:', data);
        this.categoryCheckboxOpen = false;
        this.categoryCheckboxResult = data;

        this.getExercises(this.hypermediaExercises);
        this.getWorkout()
      }  
    });
    alert.present();
  }

  itemSelected(name: any) {
    let index: number = this.nameExercises.findIndex(y => Object.is(name, y));
    let id_ex

    for (var i = 0; i < this.id_exercises.length; i++) {
      if (i == index) {
        console.log(this.id_exercises[i]);
        id_ex = this.id_exercises[i]
      }
    }

    this.navCtrl.push(ExerciseDetailsPage, {
      id_ex,
      name
    })
    console.log(name)
    console.log(index)
  }
  

}


