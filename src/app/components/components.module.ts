import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb';
import { FeatureToggleListComponent } from './feature-toggle-list';
import { RecentUpdatesComponent } from './recent-updates';
import { StatisticsCardComponent } from './statistics-card';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ContactUsDialogComponent } from './dialogs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    FeatureToggleListComponent,
    RecentUpdatesComponent,
    StatisticsCardComponent,
    ContactUsDialogComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [BreadcrumbComponent, FeatureToggleListComponent, RecentUpdatesComponent, StatisticsCardComponent],
  entryComponents: [ContactUsDialogComponent],
})
export class ComponentsModule {}
