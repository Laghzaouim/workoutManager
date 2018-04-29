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

    console.log(this.id_category)

    this.getData(link, name, nextPage);
  }

  private getData(link: string, name: any[], nextPage: string) {
    for (var i = 1; i < 26; i++){

      this.restProvider.getExercises(link+"/?page=" + i).subscribe(result => {
        this.data = result;
        //debugger
        this.getPages(result, name, nextPage);
        
        this.nameExercises = name;
        console.log(this.nameExercises)
  
      });
    }
  }

  private getPages(result: Iexercise, name: any[], nextPage: string) {
    //debugger
    for (let i in result.results) {
      if (result.results[i].category == this.id_category
        && result.results[i].name != '') {
        //debugger
        name.push(result.results[i].name);
      }
      //nextPage = result.next;
    }
    //return nextPage;
    
  }
  
  // private getNextPage(nextPage: string, name: any[]) {
  //   if (nextPage != null) {
  //     //debugger
  //     this.restProvider.getExercises(nextPage).subscribe(results => {
  //       for (let j in results.results) {
  //         if (results.results[j].category == this.id_category
  //           && results.results[j].name != '') {
  //           name.push(results.results[j].name);
  //         }
  //       }
  //       nextPage = results.next;
  //       this.nameExercises = name;
  //     });
  //   }
  //   return nextPage;
  // }

}
