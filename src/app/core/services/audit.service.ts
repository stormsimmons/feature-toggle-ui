import { HttpClient } from '@angular/common/http';
import { IAudit } from '../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(protected httpClient: HttpClient) {}

  public findAll(userParam: string = null): Observable<Array<IAudit>> {
    return this.httpClient.get<Array<IAudit>>(userParam ? `/audit?user=${userParam}` : `/audit`);
  }
}
