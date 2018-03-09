import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './_sharedData/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_sharedData/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GameModule } from './game/game.module';


import { AppComponent } from './app.component';
import { CvComponent } from './cv/cv.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SkillCardComponent } from './cv/skill-card/skill-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    ToolbarComponent,
    AboutAppComponent,
    SkillCardComponent
  ],
  imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      FlexLayoutModule,
      GameModule,
      BrowserAnimationsModule,
      MaterialModule,
      RoutingModule
  ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
