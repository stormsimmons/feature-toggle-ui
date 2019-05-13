import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, UserSet } from '../actions';
import { delayWhen, map, mergeMap, retryWhen } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IUser } from '@app/core/models';
import { of, throwError, timer } from 'rxjs';
import { OpenIDService } from '../../services';

@Injectable()
export class UserEffects {
  constructor(protected actions: Actions, protected openIdService: OpenIDService) {}

  @Effect()
  public load = this.actions
    .pipe(ofType(ActionTypes.UserLoad))
    .pipe(mergeMap(() => this.openIdService.getUser()))
    .pipe(mergeMap((user) => (user ? of(user) : throwError(new Error()))))
    .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
    .pipe(map((user: IUser) => new UserSet(user)));
}
