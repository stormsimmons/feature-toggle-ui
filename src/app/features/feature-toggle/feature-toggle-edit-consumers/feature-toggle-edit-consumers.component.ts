import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-feature-toggle-edit-consumers',
  templateUrl: './feature-toggle-edit-consumers.component.html',
  styleUrls: ['./feature-toggle-edit-consumers.component.scss'],
})
export class FeatureToggleEditConsumersComponent implements OnInit {
  @Output()
  public change: EventEmitter<Array<string>> = new EventEmitter();

  @Input()
  public consumers: Array<string> = [];

  public separatorKeysCodes: Array<number> = [ENTER, COMMA];

  constructor() {}

  public ngOnInit(): void {}

  public onClickAddConsumer(event: MatChipInputEvent): void {
    const input: HTMLInputElement = event.input;
    const value: string = event.value;

    if ((value || '').trim()) {
      this.consumers.push(value.trim());

      this.change.emit(this.consumers);
    }

    if (input) {
      input.value = '';
    }
  }

  public onClickRemoveConsumer(consumer: string): void {
    const index: number = this.consumers.indexOf(consumer);

    if (index === -1) {
      return;
    }

    this.consumers.splice(index, 1);

    this.change.emit(this.consumers);
  }
}
