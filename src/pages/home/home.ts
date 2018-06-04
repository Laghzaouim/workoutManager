import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IexerciseCategory, WgerProvider, ILanguage } from '../../providers/wger/wger'
import { ExercisesPage } from '../exercises/exercises';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  public languageRadioResult: any = 2
  languageRadioOpen: boolean = true;
  //hypermediaCategorys: string;
  categorys: IexerciseCategory;
  languages: ILanguage

  constructor(public navCtrl: NavController, public restProvider: WgerProvider, public alertCtrl: AlertController) { }

  ngOnInit(): void {
    //debugger;
    let hypermediaCategorys: string;
    let hypermediaLanguage: string
    this.restProvider.getMainContent().subscribe(result => {
      //debugger
      hypermediaCategorys = result.exercisecategory
      hypermediaLanguage = result.language

      this.getCategorys(hypermediaCategorys);
      this.getLanguage(hypermediaLanguage)
    }, err => console.log(err))
  }

  async getCategorys(link: string) {
    this.restProvider.getexerciseCategory(link).subscribe(async result => {
      this.categorys = await result
    })
  }

  getLanguage(link: string) {
    this.restProvider.getLanguage(link).subscribe(result => {
      //debugger
      this.languages = result
    })
  }

  itemSelected(id_category: number, name_category: any) {
    let languageId = this.languageRadioResult
    this.navCtrl.push(ExercisesPage, {
      id_category,
      name_category,
      languageId
    }
    )

  }

  public showLanguages() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your language');

    for (let i in this.languages.results) {

      let languageName = this.languages.results[i].full_name
      let languageId = this.languages.results[i].id

      alert.addInput({
        type: 'radio',
        label: languageName,
        value: String(languageId)
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.languageRadioOpen = false;
        this.languageRadioResult = data;
        console.log(data)
      }
    });
    // debugger
    alert.present();
  }
}
