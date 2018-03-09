import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule

  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
