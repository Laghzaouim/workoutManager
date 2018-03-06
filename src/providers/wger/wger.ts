import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WgerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WgerProvider {
  

  apiUrl = 'https://wger.de/api/v2/';

  constructor(public http: HttpClient) {
    console.log('Hello WgerProvider Provider');
  }

  getData() {
    return new Promise(resolve => {
      
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  

}
