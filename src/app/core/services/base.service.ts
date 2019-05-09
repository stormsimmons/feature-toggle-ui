import { Observable, of } from 'rxjs';
import { ITenant } from '../models';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TenantService } from './tenant.service';
import { OpenIDService } from './open-id.service';

export class BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected openIdService: OpenIDService,
    protected tenantService: TenantService,
  ) {}

  protected httpGet<T>(url: string, options: any): Observable<T> {
    return this.tenantService.findAll().pipe(
      mergeMap((tenants: Array<ITenant>) => {
        if (!tenants.length) {
          return this.tenantService
            .create({
              key: 'default-tenant',
              name: 'Default Tenant',
              users: [],
            })
            .pipe(mergeMap(() => this.httpGet<T>(url, options)));
        }

        const tenant: ITenant = tenants[0];

        return this.httpClient.get<T>(url, options);
      }),
    ) as Observable<T>;
  }
}
