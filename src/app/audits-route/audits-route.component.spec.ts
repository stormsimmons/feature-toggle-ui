import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsRouteComponent } from './audits-route.component';

describe('AuditsRouteComponent', () => {
  let component: AuditsRouteComponent;
  let fixture: ComponentFixture<AuditsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditsRouteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
