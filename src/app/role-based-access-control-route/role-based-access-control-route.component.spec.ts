import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBasedAccessControlRouteComponent } from './role-based-access-control-route.component';

describe('RoleBasedAccessControlRouteComponent', () => {
  let component: RoleBasedAccessControlRouteComponent;
  let fixture: ComponentFixture<RoleBasedAccessControlRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleBasedAccessControlRouteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleBasedAccessControlRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
