import { Component, OnInit } from '@angular/core';
import { OpenIDService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-route',
  templateUrl: './callback-route.component.html',
  styleUrls: ['./callback-route.component.scss'],
})
export class CallbackRouteComponent implements OnInit {
  constructor(protected openIdService: OpenIDService, protected router: Router) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.openIdService.callback().subscribe(() => {
        this.router.navigateByUrl('');
      });
    }, 1500);
  }
}
