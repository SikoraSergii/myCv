import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RoutingGameModule } from './routing.game.module';
import { GameService } from './_SharedData/game.service';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFirestore } from 'angularfire2/firestore';

import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import { ResultsComponent } from './results/results.component';
import { GameMaterialModule } from './_SharedData/material.module';
import { ScoreModalComponent } from './score-modal/score-modal.component';
import { FinalModalComponent } from './final-modal/final-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      RoutingGameModule,
      GameMaterialModule,
      //AngularFireModule.initializeApp(environment.firebase),
      //AngularFireDatabaseModule
  ],
    declarations: [
        GameComponent,
        CardComponent,
        ResultsComponent,
        ScoreModalComponent,
        FinalModalComponent
    ],
    providers: [
        GameService
        //AngularFirestore
    ],
    entryComponents: [
        ScoreModalComponent,
        FinalModalComponent
    ]
})
export class GameModule { }
