import { ActivatedRoute } from '@angular/router';
import { AuditService, IAudit } from '@app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audits-route',
  templateUrl: './audits-route.component.html',
  styleUrls: ['./audits-route.component.scss'],
})
export class AuditsRouteComponent implements OnInit {
  public audits: Array<IAudit> = null;

  public userParam: string = null;

  constructor(protected activatedRoute: ActivatedRoute, protected auditService: AuditService) {}

  public ngOnInit(): void {
    this.userParam = this.activatedRoute.snapshot.params.user;

    if (this.userParam) {
      this.auditService.findAll(this.userParam).subscribe((audits: Array<IAudit>) => (this.audits = audits));
    } else {
      this.auditService.findAll().subscribe((audits: Array<IAudit>) => (this.audits = audits));
    }
  }
}
