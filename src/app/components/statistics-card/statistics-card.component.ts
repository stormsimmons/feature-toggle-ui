import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss'],
})
export class StatisticsCardComponent implements OnInit {
  @Input()
  public text: string = null;

  @Input()
  public value: number = null;

  constructor() {}

  public ngOnInit(): void {}
}
