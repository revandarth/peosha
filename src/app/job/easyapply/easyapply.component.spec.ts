import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyapplyComponent } from './easyapply.component';

describe('EasyapplyComponent', () => {
  let component: EasyapplyComponent;
  let fixture: ComponentFixture<EasyapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
