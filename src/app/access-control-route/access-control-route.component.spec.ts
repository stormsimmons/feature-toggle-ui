import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlRouteComponent } from './access-control-route.component';

describe('AccessControlRouteComponent', () => {
  let component: AccessControlRouteComponent;
  let fixture: ComponentFixture<AccessControlRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessControlRouteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessControlRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
