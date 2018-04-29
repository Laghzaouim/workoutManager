import { Component, OnInit } from '@angular/core';
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
export class ExercisesPage implements OnInit {

  
  id_category: number
  data:Iexercise
  test: string
  arr:string[]
  nameExercises: string[]
  

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
    var name = new Array()
      let nextPage: string
      this.restProvider.getExercises(link).subscribe(result =>{
        //debugger
        for(let i in result.results){
          if(result.results[i].category == this.id_category 
            && result.results[i].name != ''){
              //debugger
              this.data = result
          name.push(result.results[i].name)
          nextPage = result.next;
          if(nextPage != null){
            //debugger
              this.restProvider.getExercises(nextPage).subscribe(results =>{
              nextPage = results.next
              name.push(results.results[i].name)
              //console.log(name)
              //debugger
              this.nameExercises = name
            })
          }
        }
      }
    })
  }
}
