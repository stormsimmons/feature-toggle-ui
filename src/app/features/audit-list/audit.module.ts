import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditListComponent } from './audit-list.component';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuditListComponent],
  imports: [CommonModule, MatTableModule, RouterModule],
  exports: [AuditListComponent],
})
export class AuditModule {}
