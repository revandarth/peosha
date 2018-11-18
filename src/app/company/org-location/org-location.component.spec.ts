import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLocationComponent } from './org-location.component';

describe('OrgLocationComponent', () => {
  let component: OrgLocationComponent;
  let fixture: ComponentFixture<OrgLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
