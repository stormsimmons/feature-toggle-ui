import { Component, OnInit } from '@angular/core';
import { AuditService, IAudit } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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

    let observable: Observable<Array<IAudit>> = null;

    if (this.userParam) {
      observable = this.auditService.findAll(this.userParam);
    } else {
      observable = this.auditService.findAll();
    }

    observable.subscribe((audits: Array<IAudit>) => {
      this.audits = audits;
    });
  }
}
