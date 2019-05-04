import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IAudit } from '../models';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { OpenIDService } from './open-id.service';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(protected httpClient: HttpClient, protected openIDService: OpenIDService) {}

  public findAll(): Observable<Array<IAudit>> {
    return this.openIDService
      .getUser()
      .pipe(
        mergeMap((user) =>
          this.httpClient.get<Array<IAudit>>(`${environment.uri}/api/audit`, {
            headers: new HttpHeaders({
              authorization: `Bearer ${user.id_token}`,
            }),
          }),
        ),
      )
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.openIDService.signIn(true).subscribe();
          }
          return throwError(error);
        }),
      );
  }
}
