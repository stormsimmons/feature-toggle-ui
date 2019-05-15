import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITenant } from '../models';
import { map, mergeMap, retryWhen, delayWhen } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';

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

  public findEnsure(): Observable<ITenant> {
    return this.findAll()
      .pipe(mergeMap((tenants: Array<ITenant>) => (tenants.length ? of(tenants[0]) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))));
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
