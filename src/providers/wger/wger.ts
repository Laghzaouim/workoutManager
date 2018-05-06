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

  getMainContent():Observable<Iwger>{

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<Iwger>(this.apiUrl, {headers});

  }

  getexerciseCategory(hypermedia: string):Observable<IexerciseCategory> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<IexerciseCategory>(hypermedia, {headers});   

  }

  getExercises(hypermedia: string):Observable<Iexercise> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<Iexercise>(hypermedia , {headers});   

  }

  getExercisesImege(hypermedia: string):Observable<IExerciseImage> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<IExerciseImage>(hypermedia , {headers});   

  }

  getEquipment(hypermedia: string):Observable<IEquipment> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<IEquipment>(hypermedia , {headers});   

  }

  getMuscles(hypermedia: string):Observable<IMuscles> {

    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.token);

    return this.http.get<IMuscles>(hypermedia , {headers});   

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
  exercise: string;
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

//Exercise
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

//Exercise category
export interface IexerciseCategoryIn {
  id: number;
  name: string;
}

export interface IexerciseCategory {
  count: number;
  next?: any;
  previous?: any;
  results: IexerciseCategoryIn[];
}
//Exercise image
export interface IExerciseImegeIn {
  id: number;
  license_author: string;
  status: string;
  image: string;
  is_main: boolean;
  license: number;
  exercise: number;
}

export interface IExerciseImage {
  count: number;
  next: string;
  previous?: any;
  results: IExerciseImegeIn[];
}

//equipment
interface IEquipment {
  count: number;
  next?: any;
  previous?: any;
  results: IEquipmentIn[];
}

interface IEquipmentIn {
  id: number;
  name: string;
}

//muscles
interface IMuscles {
  count: number;
  next?: any;
  previous?: any;
  results: IMusclesIn[];
}

interface IMusclesIn {
  id: number;
  name: string;
  is_front: boolean;
}
