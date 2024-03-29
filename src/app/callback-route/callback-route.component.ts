import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-route',
  templateUrl: './callback-route.component.html',
  styleUrls: ['./callback-route.component.scss'],
})
export class CallbackRouteComponent implements OnInit {
  constructor(protected router: Router) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/app/home');
    }, 2000);
  }
}
