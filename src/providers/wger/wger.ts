import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable"

/*
  Generated class for the WgerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WgerProvider {

  apiUrl = 'https://wger.de/api/v2/';
  token = 'c9790d783821eb9c4c7695ae57d088224a453d7c';

  constructor(public http: HttpClient) {
    console.log('Hello WgerProvider Provider');
  }

  getData():Observable<Iexercise> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<Iexercise>(this.apiUrl+'/exercise', {headers});   

  }
}

export interface Iwger {
  workout: string;
  workoutsession: string;
  schedulestep: string;
  schedule: string;
  day: string;
  set: string;
  setting: string;
  workoutlog: string;
  userprofile: string;
  language: string;
  daysofweek: string;
  license: string;
  setting_repetitionunit: string;
  setting_weightunit: string;
  exerciseinfo: string;
  exercise: Iexercise;
  equipment: string;
  exercisecategory: string;
  exerciseimage: string;
  exercisecomment: string;
  muscle: string;
  ingredient: string;
  weightunit: string;
  ingredientweightunit: string;
  nutritionplan: string;
  meal: string;
  mealitem: string;
  weightentry: string;
}
export interface IexerciseIn {
  id: number;
  license_author: string;
  status: string;
  description: string;
  name: string;
  name_original: string;
  creation_date: string;
  uuid: string;
  license: number;
  category: number;
  language: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
}

export interface Iexercise {
  count: number;
  next: string;
  previous?: any;
  results: IexerciseIn[];
}
