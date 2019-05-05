import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IFeatureToggle } from '@app/core';

@Component({
  selector: 'app-feature-toggle-list',
  templateUrl: './feature-toggle-list.component.html',
  styleUrls: ['./feature-toggle-list.component.scss'],
})
export class FeatureToggleListComponent implements OnInit {
  public displayedColumns: Array<string> = ['name', 'status', 'actions'];

  @Input()
  public featureToggles: Array<IFeatureToggle> = null;

  public includeArchived = false;

  @Output()
  public changeFeatureToggle: EventEmitter<IFeatureToggle> = new EventEmitter();

  @Output()
  public changeIncludeArchived: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public clickView: EventEmitter<IFeatureToggle> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public onChangeFeatureToggle(featureToggle: IFeatureToggle): void {
    this.changeFeatureToggle.emit(featureToggle);
  }

  public onChangeIncludeArchived(): void {
    this.changeIncludeArchived.emit(this.includeArchived);
  }

  public onClickView(featureToggle: IFeatureToggle): void {
    this.clickView.emit(featureToggle);
  }
}
