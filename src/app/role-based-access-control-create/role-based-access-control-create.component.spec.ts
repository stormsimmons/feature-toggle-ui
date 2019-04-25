import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBasedAccessControlCreateComponent } from './role-based-access-control-create.component';

describe('RoleBasedAccessControlCreateComponent', () => {
  let component: RoleBasedAccessControlCreateComponent;
  let fixture: ComponentFixture<RoleBasedAccessControlCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleBasedAccessControlCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleBasedAccessControlCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
