import { Component, OnInit } from '@angular/core';
import { OpenIDService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-route',
  templateUrl: './callback-route.component.html',
  styleUrls: ['./callback-route.component.scss'],
})
export class CallbackRouteComponent implements OnInit {
  constructor(protected openIDService: OpenIDService, protected router: Router) {}

  public ngOnInit(): void {
    this.openIDService.callback().subscribe((r) => {
      this.router.navigateByUrl('');
    });
  }
}
