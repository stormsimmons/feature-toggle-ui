import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { OpenIDService } from './open-id.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomOpenIDService extends OpenIDService {
  constructor(router: Router) {
    super(environment.openIdConfiguration, router);
  }
}
