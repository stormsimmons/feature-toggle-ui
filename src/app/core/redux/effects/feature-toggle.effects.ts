import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FeatureToggleService } from '../../services';
import { IFeatureToggle } from '@app/core/models';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import {
  ActionTypes,
  FeatureToggleCreate,
  FeatureTogglesLoad,
  FeatureTogglesSet,
  FeatureToggleUpdate,
} from '../actions';

@Injectable()
export class FeatureToggleEffects {
  constructor(protected actions: Actions, protected featureToggleService: FeatureToggleService) {}

  @Effect()
  public create = this.actions
    .pipe(ofType(ActionTypes.FeatureToggleCreate))
    .pipe(
      mergeMap((action: Action) =>
        this.featureToggleService
          .create((action as FeatureToggleCreate).featureToggle)
          .pipe(map(() => new FeatureTogglesLoad((action as FeatureToggleCreate).includeArchived))),
      ),
    );

  @Effect()
  public load = this.actions
    .pipe(ofType(ActionTypes.FeatureTogglesLoad))
    .pipe(mergeMap(() => this.featureToggleService.findAll()))
    .pipe(map((featureToggles: Array<IFeatureToggle>) => new FeatureTogglesSet(featureToggles)));

  @Effect()
  public update = this.actions
    .pipe(ofType(ActionTypes.FeatureToggleUpdate))
    .pipe(
      mergeMap((action: Action) =>
        this.featureToggleService
          .update((action as FeatureToggleUpdate).featureToggle)
          .pipe(map(() => new FeatureTogglesLoad((action as FeatureToggleUpdate).includeArchived))),
      ),
    );
}
