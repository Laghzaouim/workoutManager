import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseDetailsPage } from './exercise-details';

@NgModule({
  declarations: [
    ExerciseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseDetailsPage),
  ],
})
export class ExerciseDetailsPageModule {}
