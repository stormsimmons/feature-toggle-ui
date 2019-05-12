import { CommonModule } from '@angular/common';
import { MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
