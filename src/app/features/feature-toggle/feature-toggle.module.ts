import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleDetailsComponent } from './feature-toggle-details';
import {
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatButtonModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FeatureToggleListComponent } from './feature-toggle-list';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeatureToggleDetailsComponent, FeatureToggleListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    RouterModule,
  ],
  exports: [FeatureToggleDetailsComponent, FeatureToggleListComponent],
})
export class FeatureToggleModule {}
