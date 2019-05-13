import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, AuditsLoadByUser, AuditsSet } from '../actions';
import { AuditService } from '../../services';
import { IAudit } from '@app/core/models';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuditsEffects {
  constructor(protected actions: Actions, protected auditsService: AuditService) {}

  @Effect()
  public load = this.actions
    .pipe(ofType(ActionTypes.AuditsLoad))
    .pipe(mergeMap(() => this.auditsService.findAll()))
    .pipe(map((audits: Array<IAudit>) => new AuditsSet(audits)));

  @Effect()
  public loadByUser = this.actions
    .pipe(ofType(ActionTypes.AuditsLoadByUser))
    .pipe(mergeMap((action: Action) => this.auditsService.findAll((action as AuditsLoadByUser).user)))
    .pipe(map((audits: Array<IAudit>) => new AuditsSet(audits)));
}
