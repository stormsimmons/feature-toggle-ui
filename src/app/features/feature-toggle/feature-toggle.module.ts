import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleDetailsComponent } from './feature-toggle-details';
import { MatCardModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeatureToggleDetailsComponent],
  imports: [CommonModule, MatCardModule, MatListModule, RouterModule],
  exports: [FeatureToggleDetailsComponent],
})
export class FeatureToggleModule {}
