import { Component, OnInit } from '@angular/core';
import { AuditService, IAudit } from '../core';

@Component({
  selector: 'app-audits-route',
  templateUrl: './audits-route.component.html',
  styleUrls: ['./audits-route.component.scss'],
})
export class AuditsRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['timestamp', 'message', 'user'];

  public audits: Array<IAudit> = null;

  constructor(protected auditService: AuditService) {}

  public ngOnInit(): void {
    this.auditService.findAll().subscribe((audits: Array<IAudit>) => {
      this.audits = audits;
    });
  }
}
