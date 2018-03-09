import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game/game.component';
import { ResultsComponent } from './results/results.component';


const appRoutes: Routes = [
    { path: 'game', component: GameComponent },
    { path: 'results', component: ResultsComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ],
  declarations: []
})
export class RoutingGameModule { }