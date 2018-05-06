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

  
  id_category: number
  data:Iexercise
  exerciseImage: IExerciseImage
  nameExercises: string[]
  id_exercises: number[]
  name_category: string
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: WgerProvider) {}

  ngOnInit(): void {
    let hypermediaExercises: string
    let hypermediaExercisesImage: string

    this.id_category = this.navParams.get('id_category')
    this.name_category = this.navParams.get('name_category')
    //debugger
    console.log(this.name_category)

    this.restProvider.getMainContent().subscribe(result =>{
      //debugger
      hypermediaExercises = result.exercise
      hypermediaExercisesImage = result.exerciseimage
      this.getExercises(hypermediaExercises);
      // this.getExercisesImage(hypermediaExercisesImage)

     }, err => console.log(err))

  }
//   getExercisesImage(link: string){

//     var _nameImage = new Array()

//     for (var i = 1; i < 11; i++){
//     this.restProvider.getExercisesImege(link+"/?page=" + i).subscribe(result =>{

//       for (let i in result.results) {
//         if (this.id_exercises.indexOf(result.results[i].exercise)>-1){
          
//            _nameImage.push(result.results[i].image)
//           //console.log(_nameImage)
          
//         }
//       }
      
//     })
//   }
// }

  getExercises(link:string) {
    //debugger
    var _name = new Array()
    var _id = new Array()

    //console.log(this.id_category)

    this.getExerciseData(link, _name, _id);
  }

  private getExerciseData(link: string, name: any[], id: any[]) {
    for (var i = 1; i < 27; i++){

      this.restProvider.getExercises(link+"/?page=" + i).subscribe(result => {
        
        this.getPages(result, name, id);
        
        this.nameExercises = name;
        this.id_exercises = id;
  
      });
    }
  }

  private getPages(result: Iexercise, name: any[], id: any[]) {
    //debugger
    for (let i in result.results) {
      if (result.results[i].category == this.id_category
        && result.results[i].name != '') {
        //debugger
        this.data = result;
        name.push(result.results[i].name);
        id.push(result.results[i].id)
      }
    }
  }

  itemSelected(name:any){
    let index:number = this.nameExercises.findIndex(y => Object.is(name, y));
    let id_ex

   for(var i=0; i< this.id_exercises.length; i++) {
     if( i ==  index ) {
       console.log(this.id_exercises[i]);
       id_ex = this.id_exercises[i]
      }
    }

    this.navCtrl.push(ExerciseDetailsPage,{
      id_ex,
      name
    })
    console.log(name)
    console.log(index)
  }
}
