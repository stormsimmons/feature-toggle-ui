import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IFeatureToggle } from '../models';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OpenIDService } from './open-id.service';
import { mergeMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  constructor(protected httpClient: HttpClient, protected openIDService: OpenIDService) {}

  public create(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.openIDService
      .getUser()
      .pipe(
        mergeMap((user) =>
          this.httpClient.post<IFeatureToggle>(
            `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
            featureToggle,
            {
              headers: new HttpHeaders({
                authorization: `Bearer ${user.id_token}`,
              }),
            },
          ),
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

  public find(key: string): Observable<IFeatureToggle> {
    return this.openIDService
      .getUser()
      .pipe(
        mergeMap((user) =>
          this.httpClient.get<IFeatureToggle>(`${environment.uri}/api/feature-toggle/${key}`, {
            headers: new HttpHeaders({
              authorization: `Bearer ${user.id_token}`,
            }),
          }),
        ),
      )
      .pipe(
        map((x) => {
          return {
            ...x,
            roleBasedAccessControlItems: [
              {
                role: 'view',
                subject: 'someone@example.com',
              },
            ],
          } as IFeatureToggle;
        }),
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

  public findAll(includedArchived: boolean = false): Observable<Array<IFeatureToggle>> {
    return this.openIDService
      .getUser()
      .pipe(
        mergeMap((user) =>
          this.httpClient.get<Array<IFeatureToggle>>(
            `${environment.uri}/api/feature-toggle?includeArchived=${includedArchived}`,
            {
              headers: new HttpHeaders({
                authorization: `Bearer ${user.id_token}`,
              }),
            },
          ),
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

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.openIDService
      .getUser()
      .pipe(
        mergeMap((user) =>
          this.httpClient.put<IFeatureToggle>(
            `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
            featureToggle,
            {
              headers: new HttpHeaders({
                authorization: `Bearer ${user.id_token}`,
              }),
            },
          ),
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
