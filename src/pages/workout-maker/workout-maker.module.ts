import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutMakerPage } from './workout-maker';

@NgModule({
  declarations: [
    WorkoutMakerPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutMakerPage),
  ],
})
export class WorkoutMakerPageModule {}
