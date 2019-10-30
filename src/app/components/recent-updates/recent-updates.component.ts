import { Component, OnInit, Input } from '@angular/core';
import { IAudit } from '../../core';

@Component({
  selector: 'app-recent-updates',
  templateUrl: './recent-updates.component.html',
  styleUrls: ['./recent-updates.component.scss'],
})
export class RecentUpdatesComponent implements OnInit {
  @Input()
  public audits: Array<IAudit> = null;

  constructor() {}

  public ngOnInit(): void {}
}
