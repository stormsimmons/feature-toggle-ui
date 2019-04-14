import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTogglesRouteComponent } from './feature-toggles-route.component';

describe('FeatureTogglesRouteComponent', () => {
  let component: FeatureTogglesRouteComponent;
  let fixture: ComponentFixture<FeatureTogglesRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTogglesRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTogglesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
