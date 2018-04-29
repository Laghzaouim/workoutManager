import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iexercise, WgerProvider } from '../../providers/wger/wger';
import { ExerciseDetailsPage } from '../exercise-details/exercise-details';

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
export class ExercisesPage implements OnInit {

  
  id_category: number
  data:Iexercise
  nameExercises: string[]
  id_exercises: string[]
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: WgerProvider) {}

  ngOnInit(): void {
    let hypermediaExercises: string

    this.id_category = this.navParams.get('id_category')

    this.restProvider.getMainContent().subscribe(result =>{
      //debugger
      hypermediaExercises = result.exercise
      this.getExercises(hypermediaExercises);

     }, err => console.log(err))

  }

  getExercises(link:string) {
    //debugger
    var _name = new Array()
    var _id = new Array()


    console.log(this.id_category)

    this.getData(link, _name, _id);
  }

  private getData(link: string, name: any[], id: any[]) {
    for (var i = 1; i < 27; i++){

      this.restProvider.getExercises(link+"/?page=" + i).subscribe(result => {
        
        //debugger
        this.getPages(result, name, id);
        
        this.nameExercises = name;
        this.id_exercises = id;

        //console.log(this.nameExercises)
        //console.log(this.id_exercises)
  
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
      //nextPage = result.next;
    }
    //return nextPage;
  }

  itemSelected(name:any){

    let index:number = this.nameExercises.findIndex(y => Object.is(name, y));
    let id_ex

   // if(this.id_exercises.indexOf(index) == index)
   for(var i=0; i< this.id_exercises.length; i++) {
    if( i ==  index ) {
       console.log(this.id_exercises[i]);
       id_ex = this.id_exercises[i]
       
      }
    }

    this.navCtrl.push(ExerciseDetailsPage,{
      id_ex
    })

    console.log(name)
    console.log(index)
  }
}
