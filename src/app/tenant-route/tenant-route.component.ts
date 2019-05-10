import { Component, OnInit } from '@angular/core';
import { ITenant, TenantService } from '@app/core';

@Component({
  selector: 'app-tenant-route',
  templateUrl: './tenant-route.component.html',
  styleUrls: ['./tenant-route.component.scss'],
})
export class TenantRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['name'];

  public tenants: Array<ITenant> = null;

  constructor(protected tenantService: TenantService) {}

  public ngOnInit(): void {
    this.tenantService.findAll().subscribe((tenants: Array<ITenant>) => (this.tenants = tenants));
  }
}
