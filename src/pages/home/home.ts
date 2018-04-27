import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IexerciseCategory, WgerProvider} from '../../providers/wger/wger'
import { ExercisesPage } from '../exercises/exercises';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  

  //hypermediaCategorys: string;
  categorys: IexerciseCategory;

  constructor(public navCtrl: NavController, public restProvider: WgerProvider) {}

  ngOnInit(): void {
    //debugger;
    let hypermediaCategorys: string;
    this.restProvider.getMainContent().subscribe(result =>{
     //debugger
     hypermediaCategorys = result.exercisecategory
     this.getCategorys(hypermediaCategorys);
    }, err => console.log(err))
 }

  getCategorys(link: string) {
    this.restProvider.getexerciseCategory(link).subscribe(result =>{
      this.categorys = result})
  }

   itemSelected(id_category:number){
      this.navCtrl.push(ExercisesPage,{
        id_category
    })
   }
}
