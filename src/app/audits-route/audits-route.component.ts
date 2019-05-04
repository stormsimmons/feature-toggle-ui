import { Component, OnInit } from '@angular/core';
import { AuditService, IAudit } from '@app/core';

@Component({
  selector: 'app-audits-route',
  templateUrl: './audits-route.component.html',
  styleUrls: ['./audits-route.component.scss'],
})
export class AuditsRouteComponent implements OnInit {
  public audits: Array<IAudit> = null;

  constructor(protected auditService: AuditService) {}

  public ngOnInit(): void {
    // TODO: Implement user filter

    this.auditService.findAll().subscribe((audits: Array<IAudit>) => {
      this.audits = audits;
    });
  }
}
