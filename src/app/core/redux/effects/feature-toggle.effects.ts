import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, FeatureTogglesSet } from '../actions';
import { FeatureToggleService } from '../../services';
import { IFeatureToggle } from '@app/core/models';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class FeatureToggleEffects {
  constructor(protected actions: Actions, protected featureToggleService: FeatureToggleService) {}

  @Effect()
  public load = this.actions
    .pipe(ofType(ActionTypes.FeatureTogglesLoad))
    .pipe(mergeMap(() => this.featureToggleService.findAll()))
    .pipe(map((featureToggles: Array<IFeatureToggle>) => new FeatureTogglesSet(featureToggles)));
}
