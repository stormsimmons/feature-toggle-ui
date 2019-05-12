import { AuditListComponent } from './audit-list.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuditListComponent],
  imports: [CommonModule, MatTableModule, RouterModule],
  exports: [AuditListComponent],
})
export class AuditModule {}
