import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable"

@Injectable()
export class WgerProvider {

  apiUrl = 'https://wger.de/api/v2/';

  constructor(public http: HttpClient) { }

  getMainContent(): Observable<Iwger> {
    return this.http.get<Iwger>(this.apiUrl);
  }

  getexerciseCategory(hypermedia: string): Observable<IexerciseCategory> {
    return this.http.get<IexerciseCategory>(hypermedia);
  }

  getExercises(hypermedia: string): Observable<Iexercise> {
    return this.http.get<Iexercise>(hypermedia);
  }

  getExercisesImege(hypermedia: string): Observable<IExerciseImage> {
    return this.http.get<IExerciseImage>(hypermedia);
  }

  getEquipment(hypermedia: string): Observable<IEquipment> {
    return this.http.get<IEquipment>(hypermedia);
  }

  getMuscles(hypermedia: string): Observable<IMuscles> {
    return this.http.get<IMuscles>(hypermedia);
  }

  getLanguage(hypermedia: string): Observable<ILanguage> {
    return this.http.get<ILanguage>(hypermedia);
  }
}

//general interface
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
export interface IEquipment {
  count: number;
  next?: any;
  previous?: any;
  results: IEquipmentIn[];
}

export interface IEquipmentIn {
  id: number;
  name: string;
}

//muscles
export interface IMuscles {
  count: number;
  next?: any;
  previous?: any;
  results: IMusclesIn[];
}

export interface IMusclesIn {
  id: number;
  name: string;
  is_front: boolean;
}

//language
export interface ILanguage {
  count: number;
  next?: any;
  previous?: any;
  results: ILanguageIn[];
}

export interface ILanguageIn {
  id: number;
  short_name: string;
  full_name: string;
}
