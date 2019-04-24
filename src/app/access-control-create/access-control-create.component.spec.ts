import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlCreateComponent } from './access-control-create.component';

describe('AccessControlCreateComponent', () => {
  let component: AccessControlCreateComponent;
  let fixture: ComponentFixture<AccessControlCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessControlCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessControlCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
