import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditListComponent } from './audit-list.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [AuditListComponent],
  imports: [CommonModule, MatTableModule],
  exports: [AuditListComponent],
})
export class AuditModule {}
