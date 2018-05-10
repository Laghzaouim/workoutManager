import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WgerProvider, IexerciseCategory } from '../../providers/wger/wger';


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

  categorys: IexerciseCategory;
  categoryCheckboxResult: any[];
  categoryCheckboxOpen: boolean;
  hypermediaExercises: string
  
  constructor(public navCtrl: NavController,public restProvider: WgerProvider, public navParams: NavParams, public alertCtrl: AlertController) {
    
    let hypermediaCategorys: string;
    
    
    this.restProvider.getMainContent().subscribe(result =>{
      hypermediaCategorys = result.exercisecategory
      this.hypermediaExercises = result.exercise
      
      this.getCategorys(hypermediaCategorys);
      
    })
  }
  
  getExercises(link: string) {
    for (var i = 1; i < 27; i++){
      this.restProvider.getExercises(link+"/?page=" + i).subscribe(result => {
        //debugger
        for (let j in result.results){

          if(this.categoryCheckboxResult.find(x => x == result.results[j].category) ){

            console.log(result.results[j].name)
            
          }
        }
      })
    }
  }

  getCategorys(link: string) {
    this.restProvider.getexerciseCategory(link).subscribe(result =>{
      this.categorys = result

    
    })
  }

  showCategory() {
    let alert = this.alertCtrl.create();
    alert.setTitle('What do you want to train today?');

    for (let i in this.categorys.results){
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
        console.log(data)
        this.getExercises(this.hypermediaExercises);
      }
    });
    alert.present();
  }

}
