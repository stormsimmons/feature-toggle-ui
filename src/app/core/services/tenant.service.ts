import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITenant } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(protected httpClient: HttpClient) {}

  public create(tenant: ITenant): Observable<ITenant> {
    return this.httpClient.post<ITenant>('/tenant', tenant);
  }

  public findAll(): Observable<Array<ITenant>> {
    return this.httpClient.get<Array<ITenant>>('/tenant');
  }

  public update(tenant: ITenant): Observable<ITenant> {
    return this.httpClient.put<ITenant>('/tenant', tenant);
  }
}
