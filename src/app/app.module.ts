import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WgerProvider } from '../providers/wger/wger';
import { HttpClientModule } from '@angular/common/http';
import { ExercisesPage } from '../pages/exercises/exercises';
import { ExerciseDetailsPage } from '../pages/exercise-details/exercise-details';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ExercisesPage,
    ExerciseDetailsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ExercisesPage,
    ExerciseDetailsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WgerProvider,
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule {}
