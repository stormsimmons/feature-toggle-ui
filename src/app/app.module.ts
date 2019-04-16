import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatTableModule,
  MatListModule,
  MatCheckboxModule,
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatProgressBarModule,
} from '@angular/material';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { FormsModule } from '@angular/forms';
import { FeatureToggleCreateComponent } from './feature-toggle-create/feature-toggle-create.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FeatureTogglesRouteComponent,
    FeatureToggleEditRouteComponent,
    FeatureToggleCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FeatureToggleCreateComponent],
})
export class AppModule {}
