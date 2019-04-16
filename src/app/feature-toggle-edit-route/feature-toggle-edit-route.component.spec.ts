import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route.component';

describe('FeatureToggleEditRouteComponent', () => {
  let component: FeatureToggleEditRouteComponent;
  let fixture: ComponentFixture<FeatureToggleEditRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureToggleEditRouteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggleEditRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
