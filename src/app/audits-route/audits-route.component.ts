import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuditService, AuditsLoad, BaseComponent, IState, AuditsLoadByUser } from '@app/core';

@Component({
  selector: 'app-audits-route',
  templateUrl: './audits-route.component.html',
  styleUrls: ['./audits-route.component.scss'],
})
export class AuditsRouteComponent extends BaseComponent implements OnInit {
  public userParam: string = null;

  constructor(protected activatedRoute: ActivatedRoute, protected auditService: AuditService, store: Store<IState>) {
    super(store);
  }

  public ngOnInit(): void {
    this.userParam = this.activatedRoute.snapshot.params.user;

    if (this.userParam) {
      this.store.dispatch(new AuditsLoadByUser(this.userParam));
    } else {
      this.store.dispatch(new AuditsLoad());
    }
  }
}
