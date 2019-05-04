import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIDService } from './open-id.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomOpenIDService extends OpenIDService {
  constructor(router: Router) {
    super(environment.openIdConfiguration, router);
  }
}
