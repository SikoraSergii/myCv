import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CvComponent } from '../cv/cv.component';
import { AboutAppComponent } from '../about-app/about-app.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/cv', pathMatch: 'full' },
    { path: 'cv', component: CvComponent},
    { path: 'about-app', component: AboutAppComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
  declarations: []
})
export class RoutingModule { }
