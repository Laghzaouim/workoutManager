import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { WorkoutMakerPage } from '../workout-maker/workout-maker';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WorkoutMakerPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
