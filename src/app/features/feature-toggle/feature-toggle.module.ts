import { CommonModule } from '@angular/common';
import { FeatureToggleDetailsComponent } from './feature-toggle-details';
import { FeatureToggleEditConsumersComponent } from './feature-toggle-edit-consumers';
import { FeatureToggleListComponent } from './feature-toggle-list';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  declarations: [FeatureToggleDetailsComponent, FeatureToggleListComponent, FeatureToggleEditConsumersComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    RouterModule,
  ],
  exports: [FeatureToggleDetailsComponent, FeatureToggleEditConsumersComponent, FeatureToggleListComponent],
})
export class FeatureToggleModule {}
