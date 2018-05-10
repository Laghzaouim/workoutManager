import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iexercise, WgerProvider } from '../../providers/wger/wger';
import { ExerciseDetailsPage } from '../exercise-details/exercise-details';

@IonicPage()
@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})
export class ExercisesPage implements OnInit {


  id_category: number
  data: Iexercise
  //exerciseImage: IExerciseImage
  nameExercises: string[]
  id_exercises: number[]
  name_category: string
  languageId: number
  //exercisesImg : string[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: WgerProvider) { }

  ngOnInit(): void {
    let hypermediaExercises: string
    //let hypermediaExercisesImage: string


    this.id_category = this.navParams.get('id_category')
    this.name_category = this.navParams.get('name_category')
    this.languageId = this.navParams.get('languageId')
    console.log("language id: " + this.languageId)
    //debugger
    //console.log(this.name_category)

    this.restProvider.getMainContent().subscribe(result => {
      //debugger
      hypermediaExercises = result.exercise
      //hypermediaExercisesImage = result.exerciseimage


      this.getExercises(hypermediaExercises);

      //this.getImage(hypermediaExercisesImage)

    }, err => console.log(err))

  }

  // private getImage(link: string){
  //   var imgUrl = new Array()
  //   for (var i = 1; i < 11; i++){
  //   this.restProvider.getExercisesImege(link+"/?page=" + i).subscribe(result =>{
  //     //debugger
  //     for(let j in result.results){
  //       //for (let j in this.id_exercises){

  //         if(this.id_exercises.indexOf(result.results[j].exercise) > 0){
  //           //console.log("image url: " + result.results[j].image)
  //           imgUrl.push(result.results[j].image)
  //         }else if(!this.id_exercises.some(x => x === result.results[j].exercise)){

  //           //imgUrl.push(result.results[j].image)
  //         }
  //           //console.log("no image")
  //      // }
  //       }
  //       this.exercisesImg = imgUrl
  //     console.log("length img: " + imgUrl.length)
  //   })
  // }
  // }

  getExercises(link: string) {
    //debugger
    var _name = new Array()
    var _id = new Array()

    //console.log(this.id_category)

    this.getExerciseData(link, _name, _id);
  }

  private getExerciseData(link: string, name: any[], id: any[]) {
    for (var i = 1; i < 27; i++) {

      this.restProvider.getExercises(link + "/?page=" + i).subscribe(result => {

        this.getPages(result, name, id);

        this.nameExercises = name;
        this.id_exercises = id;

        console.log("length exercises: " + this.nameExercises.length)
      });
    }
  }

  private getPages(result: Iexercise, name: any[], id: any[]) {
    //debugger
    for (let i in result.results) {
      if (result.results[i].category == this.id_category
        && result.results[i].name != ''
        && result.results[i].language == this.languageId) {
        //debugger
        this.data = result;
        name.push(result.results[i].name);
        id.push(result.results[i].id)
      }
    }
  }

  getLanguage(link: string) {
    this.restProvider.getLanguage(link).subscribe(result => {
      //debugger
    })
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
