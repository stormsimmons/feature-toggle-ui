import { Component, Input, OnInit } from '@angular/core';
import { IAudit } from '@app/core';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss'],
})
export class AuditListComponent implements OnInit {
  public displayedColumns: Array<string> = ['timestamp', 'message', 'user'];

  @Input()
  public audits: Array<IAudit> = null;

  constructor() {}

  public ngOnInit(): void {}
}
