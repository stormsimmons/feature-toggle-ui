import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITenant } from '../models';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(protected httpClient: HttpClient) {}

  public create(tenant: ITenant): Observable<ITenant> {
    return this.httpClient.post<ITenant>('/tenant', tenant);
  }

  public find(key: string): Observable<ITenant> {
    return this.findAll().pipe(map((tenants: Array<ITenant>) => tenants.find((x: ITenant) => x.key === key)));
  }

  public findSelected(): Observable<ITenant> {
    return this.findAll().pipe(
      map((tenants: Array<ITenant>) => {
        const tenantKey: string = localStorage.getItem('feature-toggle:tenant:key');

        return tenants.find((x: ITenant) => x.key === tenantKey) || tenants[0];
      }),
    );
  }

  public findAll(): Observable<Array<ITenant>> {
    return this.httpClient.get<Array<ITenant>>('/tenant');
  }

  public setSelectedTenant(tenant: ITenant): Observable<void> {
    localStorage.setItem('feature-toggle:tenant:key', tenant.key);
    return of(null);
  }

  public update(tenant: ITenant): Observable<ITenant> {
    return this.httpClient.put<ITenant>(`/tenant/${tenant.key}`, tenant);
  }
}
