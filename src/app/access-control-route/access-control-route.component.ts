import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AccessControlCreateComponent } from '../access-control-create/access-control-create.component';

@Component({
  selector: 'app-access-control-route',
  templateUrl: './access-control-route.component.html',
  styleUrls: ['./access-control-route.component.scss'],
})
export class AccessControlRouteComponent implements OnInit {
  public accessControls: Array<any> = [];

  public displayedColumns: Array<string> = ['user', 'role'];

  constructor(protected dialog: MatDialog) {}

  public ngOnInit(): void {}

  public onClickFabAdd(): void {
    const dialogRef = this.dialog.open(AccessControlCreateComponent, {});

    dialogRef.afterClosed().subscribe(() => {});
  }
}
