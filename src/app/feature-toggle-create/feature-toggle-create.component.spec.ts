import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureToggleCreateComponent } from './feature-toggle-create.component';

describe('FeatureToggleCreateComponent', () => {
  let component: FeatureToggleCreateComponent;
  let fixture: ComponentFixture<FeatureToggleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureToggleCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
