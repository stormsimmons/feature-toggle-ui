import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
